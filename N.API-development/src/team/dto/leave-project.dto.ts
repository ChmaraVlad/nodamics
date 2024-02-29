import { IsNotEmpty, IsString } from 'class-validator';

export class LeaveProjectDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;
}
