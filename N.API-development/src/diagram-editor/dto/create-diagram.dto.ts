import { IsNotEmpty, IsJSON, IsOptional, IsString } from 'class-validator';

export class CreateDiagramDto {
  @IsNotEmpty()
  @IsString()
  diagramName: string;

  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsJSON()
  @IsOptional()
  elements?: JSON;
}
