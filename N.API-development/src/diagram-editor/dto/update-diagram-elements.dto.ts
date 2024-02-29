import { IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDiagramElementsDto {
  @IsNotEmpty()
  @IsString()
  diagramId: string;
  @IsJSON()
  @IsOptional()
  elements: any;
}
