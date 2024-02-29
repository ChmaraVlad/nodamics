import { IsNotEmpty, IsString } from 'class-validator';

export class GetProjectTeamMemberResponseDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  projectTeamId: string;

  @IsString()
  @IsNotEmpty()
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  createdAt: Date;
}
