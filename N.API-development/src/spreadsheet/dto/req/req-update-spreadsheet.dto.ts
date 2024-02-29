import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReqCreateNewCellDto } from './req-create-new-cell.dto';
import { ReqUpdateExistedCellDto } from './req-update-existed-cell.dto';

export class ReqUpdateSpreadsheetDto {
  @IsString()
  spreadsheetId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReqUpdateExistedCellDto)
  @IsOptional()
  existedCells: ReqUpdateExistedCellDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReqCreateNewCellDto)
  @IsOptional()
  newCells: ReqCreateNewCellDto[];
}
