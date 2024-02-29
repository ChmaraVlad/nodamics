import { IsNotEmpty, IsString } from 'class-validator';

export class GetProjectTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  diagramId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
