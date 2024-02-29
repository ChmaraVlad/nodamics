export class CreateNewSpreadsheetCellDto {
  content: string;
  rowIndex: number;
  columnIndex: number;
  constructor(data: CreateNewSpreadsheetCellDto) {
    this.content = data.content;
    this.rowIndex = data.rowIndex;
    this.columnIndex = data.columnIndex;
  }
}
