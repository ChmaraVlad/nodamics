import { IsString } from 'class-validator';

export class ReqUpdateSpreadsheetParamsDto {
  @IsString()
  spreadsheetId: string;
  @IsString()
  name: string;
}
