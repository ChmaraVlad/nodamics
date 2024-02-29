export class UpdateSpreadsheetParamsDto {
  spreadsheetId: string;
  name: string;

  constructor(data: UpdateSpreadsheetParamsDto) {
    this.spreadsheetId = data.spreadsheetId;
    this.name = data.name;
  }
}
