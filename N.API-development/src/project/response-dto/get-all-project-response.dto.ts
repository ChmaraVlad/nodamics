import { IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class User {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}

class DataItem {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  createdAt: Date;

  @ValidateNested()
  @IsNotEmpty()
  creator: User;

  @ValidateNested()
  @IsNotEmpty()
  lastEditor: User;
}

export class GetAllProjectResponse extends Array<DataItem> {}
