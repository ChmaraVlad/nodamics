import { Injectable } from '@nestjs/common';
import { SpreadsheetRepository } from './spreadsheet.repository';
import * as XLSX from 'xlsx';
import { Prisma, Spreadsheet, SpreadsheetColumn } from '@prisma/client';
import { GoogleApisService } from '../google-apis';
import { IParsedSpreadsheet, IParsedSpreadsheetItem } from './interface';
import {
  CreateNewSpreadsheetCellDto,
  isISpreadsheetExistedRowView,
  isISpreadsheetNewValueView,
  ISpreadsheetRowView,
  ISpreadsheetView,
  UpdateSpreadsheetDto,
  UpdateSpreadsheetParamsDto,
} from './dto';

export interface IUpdateExistedValue {
  id: string;
  content: string;
}

export interface ICreateNewValue {
  content: string;
  rowIndex: number;
  columnIndex: number;
}

@Injectable()
export class SpreadsheetService {
  constructor(
    private readonly spreadsheetRepository: SpreadsheetRepository,
    private readonly googleApisService: GoogleApisService,
  ) {}

  parseSpreadsheet(spreadSheet: Buffer) {
    const workbook = XLSX.read(spreadSheet.buffer, {
      type: 'buffer',
      raw: true,
      cellDates: true,
    });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const merges = worksheet['!merges'] || [];
    const json: IParsedSpreadsheet = XLSX.utils
      .sheet_to_json<any[]>(worksheet, {
        header: 1,
        skipHidden: false,
        defval: '',
      })
      .map((row) => {
        return row.map((content) => {
          return { content };
        });
      });
    merges.forEach((mergeData) => {
      json[mergeData.s.r][mergeData.s.c] = {
        ...json[mergeData.s.r][mergeData.s.c],
        merge: mergeData,
      };
    });
    return json;
  }

  // TODO use worker
  async storeSpreadsheetData(params: {
    projectId: string;
    data: IParsedSpreadsheet;
    spreadsheetName: string;
  }) {
    const { projectId, data, spreadsheetName } = params;
    const sheet = await this.spreadsheetRepository.spreadsheet.create({
      data: {
        name: spreadsheetName,
        Project: { connect: { id: projectId } },
      },
    });

    return this.fillSpreadsheetData({
      data,
      sheet,
    });
  }

  async fillSpreadsheetData(params: {
    data: IParsedSpreadsheet;
    sheet: Spreadsheet;
  }) {
    const { sheet, data } = params;
    return this.spreadsheetRepository.transaction(async (prisma) => {
      const columnNames = data[0].map((item) => item.content);
      await this.createColumns(prisma, columnNames, sheet.id);
      const columns = await this.spreadsheetRepository.column.findMany({
        where: { sheetId: sheet.id },
      });
      for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        const rowData = data[rowIndex];
        if (rowData) {
          await this.createRowAndColumnValues(
            prisma,
            sheet,
            columns,
            rowData,
            rowIndex,
          );
        }
      }

      return sheet;
    });
  }

  private createColumns(
    prisma: SpreadsheetRepository,
    columnNames: (string | number)[],
    sheetId: string,
  ) {
    return prisma.column.createMany({
      data: columnNames.map((name) => ({
        name: `${name}`,
        sheetId,
      })),
    });
  }

  private async createRowAndColumnValues(
    prisma: SpreadsheetRepository,
    entity: Spreadsheet,
    columns: SpreadsheetColumn[],
    rowData: IParsedSpreadsheetItem[],
    rowIndex: number,
  ): Promise<void> {
    const row = await prisma.row.create({
      data: {
        sheet: { connect: { id: entity.id } },
        rowIndex,
      },
    });
    const columnValues: Prisma.SpreadsheetValueCreateManyInput[] = rowData.map(
      (value, columnIndex) => ({
        content: `${value.content}`,
        merge: value.merge,
        rowId: row.id,
        columnIndex,
        columnId: columns[columnIndex]?.id,
      }),
    );

    await prisma.value.createMany({
      data: columnValues,
    });
  }

  getSpreadsheetData(params: { spreadsheetId: string }) {
    return this.spreadsheetRepository.getSpreadsheetData(params);
  }

  getSpreadsheetsData(params: { spreadsheetIds: string[] }) {
    return this.spreadsheetRepository.getSpreadsheetsData(params);
  }

  deleteSpreadsheet(params: { spreadsheetId: string }) {
    return this.spreadsheetRepository.deleteSpreadsheet(params);
  }

  getSpreadsheetsByProjectId(params: { projectId: string }) {
    return this.spreadsheetRepository.getSpreadsheetsByProjectId(params);
  }

  getDatasetNameFromSpreadsheet({
    spreadSheet,
  }: {
    spreadSheet: IParsedSpreadsheet;
  }) {
    // find a y index of "X Axis line"
    const XAxisYIndex = spreadSheet.findIndex((values) => {
      return values.some((value) => value.content === 'X Axis');
    });

    return spreadSheet[XAxisYIndex + 1]
      .find((value) => {
        return value.content !== '';
      })
      .content.toString();
  }

  async getAllGoogleSpreadsheets({ userId }: { userId: string }) {
    return this.googleApisService.getAllSpreadsheetsByAccessToken({
      userId,
    });
  }

  async updateSpreadsheet(updateSpreadsheetDto: UpdateSpreadsheetDto) {
    await this.spreadsheetRepository.updateSpreadsheetCellsContent({
      cells: updateSpreadsheetDto.existedCells,
    });

    await this.createNewSpreadsheetCells({
      cells: updateSpreadsheetDto.newCells,
      spreadsheetId: updateSpreadsheetDto.spreadsheetId,
    });
  }

  updateSpreadsheetParams(data: UpdateSpreadsheetParamsDto) {
    return this.spreadsheetRepository.updateSpreadsheetParams(data);
  }

  async createNewSpreadsheetCells(params: {
    cells: CreateNewSpreadsheetCellDto[];
    spreadsheetId: string;
  }) {
    const groupedByRow: {
      rowIndex: number;
      cells: CreateNewSpreadsheetCellDto[];
    }[] = params.cells.reduce((acc, cell) => {
      const rowIndex = cell.rowIndex;
      const existed = acc.find((item) => item.rowIndex === rowIndex);
      if (existed) {
        existed.cells.push(cell);
      } else {
        acc.push({
          rowIndex,
          cells: [cell],
        });
      }
      return acc;
    }, []);
    return this.spreadsheetRepository.transaction(async (prisma) => {
      for (const groupedByRowElement of groupedByRow) {
        const row = await prisma.row.create({
          data: {
            sheet: { connect: { id: params.spreadsheetId } },
            rowIndex: groupedByRowElement.rowIndex,
          },
        });
        const columnValues: Prisma.SpreadsheetValueCreateManyInput[] =
          groupedByRowElement.cells.map((value) => ({
            content: `${value.content}`,
            rowId: row.id,
            columnIndex: value.columnIndex,
          }));

        await prisma.value.createMany({
          data: columnValues,
        });
      }
    });
  }

  async clearSpreadsheetData(params: { spreadsheetId: string }) {
    return this.spreadsheetRepository.clearSpreadsheetData(params);
  }

  async rewriteSpreadsheet(params: { spreadsheetId: string; buffer: Buffer }) {
    const workbook = this.parseSpreadsheet(params.buffer);

    await this.clearSpreadsheetData({ spreadsheetId: params.spreadsheetId });
    const spreadsheet = await this.spreadsheetRepository.getSpreadsheetData({
      spreadsheetId: params.spreadsheetId,
    });
    return this.fillSpreadsheetData({
      data: workbook,
      sheet: spreadsheet,
    });
  }

  async uploadSpreadsheetsBodyJson({
    spreadsheets,
    projectId,
  }: {
    spreadsheets: ISpreadsheetView[];
    projectId: string;
  }) {
    return Promise.all(
      spreadsheets.map(async (spreadsheet) =>
        this.uploadSpreadsheetBodyJson({
          projectId,
          jsonSpreadsheet: spreadsheet,
        }),
      ),
    );
  }

  spreadsheetRowsToCreateNewSpreadsheetCellDto({
    rows,
  }: {
    rows: ISpreadsheetRowView[];
  }) {
    const newCells: CreateNewSpreadsheetCellDto[] = [];
    rows.forEach((row) => {
      const rowIndex = isISpreadsheetExistedRowView(row)
        ? row.rowIndex
        : undefined;

      row.values.forEach((cell) => {
        const cellRowIndex = isISpreadsheetNewValueView(cell)
          ? cell.rowIndex
          : undefined;

        newCells.push({
          content: cell.content.toString(),
          columnIndex: cell.columnIndex,
          rowIndex: rowIndex !== undefined ? rowIndex : cellRowIndex,
        });
      });
    });
    return newCells;
  }

  async uploadSpreadsheetBodyJson({
    jsonSpreadsheet,
    projectId,
  }: {
    jsonSpreadsheet: ISpreadsheetView;
    projectId: string;
  }) {
    const existedSpreadsheet =
      await this.spreadsheetRepository.spreadsheet.findFirst({
        where: {
          id: jsonSpreadsheet.id,
          Project: { id: projectId },
        },
      });

    if (!existedSpreadsheet) {
      const sheet = await this.createSpreadsheetFromJson({
        jsonSpreadsheet: jsonSpreadsheet,
        projectId,
      });
      return {
        previousSpreadsheetId: jsonSpreadsheet.id,
        newSpreadsheetId: sheet.id,
      };
    } else {
      await this.rewriteSpreadsheetFromJson({
        jsonSpreadsheet: jsonSpreadsheet,
      });

      return {
        previousSpreadsheetId: jsonSpreadsheet.id,
        newSpreadsheetId: existedSpreadsheet.id,
      };
    }
  }

  async rewriteSpreadsheetFromJson({
    jsonSpreadsheet,
  }: {
    jsonSpreadsheet: ISpreadsheetView;
  }) {
    const newCells = this.spreadsheetRowsToCreateNewSpreadsheetCellDto({
      rows: jsonSpreadsheet.rows,
    });
    await this.clearSpreadsheetData({ spreadsheetId: jsonSpreadsheet.id });

    await this.createNewSpreadsheetCells({
      cells: newCells,
      spreadsheetId: jsonSpreadsheet.id,
    });
  }

  async createSpreadsheetFromJson({
    jsonSpreadsheet,
    projectId,
  }: {
    jsonSpreadsheet: ISpreadsheetView;
    projectId: string;
  }) {
    const sheet = await this.spreadsheetRepository.spreadsheet.create({
      data: {
        name: jsonSpreadsheet.name,
        Project: { connect: { id: projectId } },
      },
    });
    const newCells = this.spreadsheetRowsToCreateNewSpreadsheetCellDto({
      rows: jsonSpreadsheet.rows,
    });
    await this.createNewSpreadsheetCells({
      cells: newCells,
      spreadsheetId: sheet.id,
    });
    return sheet;
  }
}
