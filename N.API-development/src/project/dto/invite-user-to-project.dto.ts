import { IsNotEmpty, IsString } from 'class-validator';

export class InviteUserToProjectDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  invitedUserEmail: string;
}
