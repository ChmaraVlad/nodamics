import { CreateBaseLayerDto } from './create-base-layer.dto';
import { IsString } from 'class-validator';

export class CreateLayerWithDiagramEditorIdDto extends CreateBaseLayerDto {
  @IsString()
  diagramEditorId: string;
  constructor(createLayerDto: CreateLayerWithDiagramEditorIdDto) {
    super();
    Object.assign(this, createLayerDto);
  }
}
