import { IsOptional } from 'class-validator';

export class UserUpdateDataDto {
  @IsOptional()
  firstName?: string;
  @IsOptional()
  lastName?: string;
  @IsOptional()
  phoneNumber?: string;
}
