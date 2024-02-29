import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateExecutionGridDto {
  @IsNotEmpty()
  @IsString()
  diagramId: string;

  @IsOptional()
  @IsString()
  gridColor?: string;

  @IsOptional()
  @IsString()
  xAxisTitle?: string;

  @IsOptional()
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isShowVerticalGridLines?: boolean;
}

export interface IUpdateExecutionGridResponse {
  color: string;
}
