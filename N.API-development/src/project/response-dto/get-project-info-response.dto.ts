import { IsString, IsDate, ValidateNested } from 'class-validator';

class Creator {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

class LastEditor {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class GetProjectInfoResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @ValidateNested()
  creator: Creator;

  @ValidateNested()
  lastEditor: LastEditor;
}
