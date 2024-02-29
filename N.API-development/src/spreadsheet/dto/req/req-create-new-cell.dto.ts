import { IsOptional, IsString, IsNumber } from 'class-validator';

export class ReqCreateNewCellDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  rowIndex: number;

  @IsOptional()
  @IsNumber()
  columnIndex: number;
}
