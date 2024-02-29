// import {
//   IsNotEmpty,
//   ValidateNested,
//   IsArray,
//   IsJSON,
//   IsOptional,
//   IsString,
// } from 'class-validator';
// import { Type } from 'class-transformer';
// import { CreateDiagramTagDto } from '../../diagram-tag';
//
// export class UpdateDiagramDto {
//   @IsNotEmpty()
//   @IsString()
//   diagramId: string;
//
//   @IsOptional()
//   @IsString()
//   diagramName?: string;
//
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   diagramDescription?: string;
//
//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateDiagramTagDto)
//   diagramTags?: CreateDiagramTagDto[];
//
//   @IsOptional()
//   @IsJSON()
//   @IsOptional()
//   elements?: JSON;
// }
