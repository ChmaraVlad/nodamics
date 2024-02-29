export class UpdateExistedSpreadsheetCellDto {
  id: string;
  content: string;
  constructor(data: UpdateExistedSpreadsheetCellDto) {
    this.id = data.id;
    this.content = data.content;
  }
}
