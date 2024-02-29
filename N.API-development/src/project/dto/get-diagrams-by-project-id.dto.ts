import { IsNotEmpty, IsString } from 'class-validator';

export class GetDiagramsByProjectIdDto {
  @IsNotEmpty()
  @IsString()
  projectId: string;
}
