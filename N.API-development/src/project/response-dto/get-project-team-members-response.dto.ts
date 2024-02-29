import { IsString, IsEmail, IsOptional, ValidateNested } from 'class-validator';

class Member {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsEmail()
  email: string;
}

export class GetProjectTeamMembersResponseDto {
  @ValidateNested({ each: true })
  members: Member[];
}
