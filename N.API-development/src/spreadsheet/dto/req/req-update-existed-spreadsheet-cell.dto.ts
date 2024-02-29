export class ReqUpdateExistedSpreadsheetCellDto {
  id: string;
  content: string;
  constructor(data: ReqUpdateExistedSpreadsheetCellDto) {
    this.id = data.id;
    this.content = data.content;
  }
}
