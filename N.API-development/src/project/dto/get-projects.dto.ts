import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetProjectsDto {
  @IsOptional()
  @IsString()
  cursorId?: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
