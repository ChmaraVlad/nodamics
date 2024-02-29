import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import {
  UpdateExistedSpreadsheetCellDto,
  UpdateSpreadsheetParamsDto,
} from './dto';

@Injectable()
export class SpreadsheetRepository {
  constructor(private readonly prisma: PrismaService) {}

  get spreadsheet() {
    return this.prisma.spreadsheet;
  }

  get column() {
    return this.prisma.spreadsheetColumn;
  }

  get row() {
    return this.prisma.spreadsheetRow;
  }

  get value() {
    return this.prisma.spreadsheetValue;
  }

  async transaction<T>(
    callback: (prisma: SpreadsheetRepository) => Promise<T>,
  ): Promise<T> {
    return callback(this);
  }

  getSpreadsheetData(params: { spreadsheetId: string }) {
    return this.prisma.spreadsheet.findUnique({
      where: { id: params.spreadsheetId },
      include: {
        rows: {
          include: {
            values: {
              orderBy: {
                columnIndex: 'asc',
              },
            },
          },
          orderBy: {
            rowIndex: 'asc',
          },
        },
      },
    });
  }

  getSpreadsheetsData(params: { spreadsheetIds: string[] }) {
    return this.prisma.spreadsheet.findMany({
      where: { id: { in: params.spreadsheetIds } },
      include: {
        rows: {
          include: {
            values: {
              orderBy: {
                columnIndex: 'asc',
              },
            },
          },
        },
      },
    });
  }

  deleteSpreadsheet(params: { spreadsheetId: string }) {
    return this.prisma.spreadsheet.delete({
      where: { id: params.spreadsheetId },
    });
  }

  getSpreadsheetsByProjectId(params: { projectId: string }) {
    return this.prisma.spreadsheet.findMany({
      where: { projectId: params.projectId },
    });
  }

  async updateSpreadsheetCellsContent(params: {
    cells: UpdateExistedSpreadsheetCellDto[];
  }) {
    return await Promise.all(
      params.cells.map(
        async (value) =>
          await this.value.update({
            where: { id: value.id },
            data: { content: value.content },
          }),
      ),
    );
  }

  updateSpreadsheetParams(params: UpdateSpreadsheetParamsDto) {
    return this.prisma.spreadsheet.update({
      where: { id: params.spreadsheetId },
      data: { name: params.name },
    });
  }

  async clearSpreadsheetData(params: { spreadsheetId: string }) {
    await this.prisma.spreadsheetRow.deleteMany({
      where: { sheetId: params.spreadsheetId },
    });
    await this.prisma.spreadsheetColumn.deleteMany({
      where: { sheetId: params.spreadsheetId },
    });
  }
}
