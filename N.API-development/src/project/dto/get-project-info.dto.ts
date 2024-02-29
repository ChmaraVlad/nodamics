import { IsOptional, IsString } from 'class-validator';

export class GetProjectInfoDto {
  @IsString()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  diagramId?: string;
}
