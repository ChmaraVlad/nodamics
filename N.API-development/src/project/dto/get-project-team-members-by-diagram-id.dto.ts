import { IsOptional, IsString } from 'class-validator';

export class GetProjectTeamMembersByDiagramIdDto {
  @IsString()
  @IsOptional()
  diagramId?: string;

  @IsString()
  @IsOptional()
  projectId?: string;
}
