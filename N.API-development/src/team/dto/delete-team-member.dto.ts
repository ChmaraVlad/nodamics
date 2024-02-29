import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTeamMemberFromProjectTeamDto {
  @IsString()
  @IsNotEmpty()
  teamMemberId: string;
}
