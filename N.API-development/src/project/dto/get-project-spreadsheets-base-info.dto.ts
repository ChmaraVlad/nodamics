import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetProjectSpreadsheetsBaseInfoDtoRequest {
  @IsString()
  @IsNotEmpty()
  projectId: string;
}

class SpreadsheetInfo {
  @IsUUID()
  id: string;

  @IsDate()
  createdAt: Date;

  @IsString()
  name: string;

  @IsUUID()
  projectId: string;
}

export class ValidateSpreadsheetResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpreadsheetInfo)
  data: SpreadsheetInfo[];
}
