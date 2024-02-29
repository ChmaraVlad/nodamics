import { CreateBaseLayerDto } from './create-base-layer.dto';
import { IsString } from 'class-validator';

export class CreateLayerWithDiagramIdDto extends CreateBaseLayerDto {
  @IsString()
  diagramId: string;
  constructor(createLayerDto: CreateLayerWithDiagramIdDto) {
    super();
    Object.assign(this, createLayerDto);
  }
}
