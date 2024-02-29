import { IsString, IsBoolean } from 'class-validator';

export abstract class CreateBaseLayerDto {
  @IsString()
  layerName: string;
  @IsBoolean()
  visible: boolean;
  @IsBoolean()
  isSelected: boolean;
}
