export class CreateFootprintRequestDto {
  sqlQueryId: string;
  sqlQuery: string;
  constructor(footprintRequestDto: CreateFootprintRequestDto) {
    this.sqlQueryId = footprintRequestDto.sqlQueryId;
    this.sqlQuery = footprintRequestDto.sqlQuery;
  }
}
