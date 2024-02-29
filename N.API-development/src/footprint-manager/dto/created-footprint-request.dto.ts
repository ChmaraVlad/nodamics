export class CreatedFootprintRequestDto {
  sqlQueryId: string;
  sqlQuery: string;
  executionId: string;
  constructor(footprintRequestDto: CreatedFootprintRequestDto) {
    this.sqlQueryId = footprintRequestDto.sqlQueryId;
    this.sqlQuery = footprintRequestDto.sqlQuery;
    this.executionId = footprintRequestDto.executionId;
  }
}
