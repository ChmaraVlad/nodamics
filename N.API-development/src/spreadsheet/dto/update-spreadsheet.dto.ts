import { CreateNewSpreadsheetCellDto } from './create-new-spreadsheet-cell.dto';
import { UpdateExistedSpreadsheetCellDto } from './update-existed-spreadsheet-cell.dto';

export class UpdateSpreadsheetDto {
  spreadsheetId: string;
  existedCells?: UpdateExistedSpreadsheetCellDto[];
  newCells?: CreateNewSpreadsheetCellDto[];
  constructor(data: UpdateSpreadsheetDto) {
    this.existedCells = data.existedCells;
    this.newCells = data.newCells;
    this.spreadsheetId = data.spreadsheetId;
  }
}
