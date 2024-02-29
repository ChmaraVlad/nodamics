import { IsString } from 'class-validator';

export class ReqUpdateExistedCellDto {
  @IsString()
  id: string;

  @IsString()
  content: string;
}
