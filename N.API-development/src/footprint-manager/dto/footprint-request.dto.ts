export class FootprintRequestDto {
  sqlQueryId: string;
  executionId: string;
  id?: string;
  createdAt?: Date;
  lastRequestedAt?: Date;
  constructor(footprintRequestDto: FootprintRequestDto) {
    this.sqlQueryId = footprintRequestDto.sqlQueryId;
    this.executionId = footprintRequestDto.executionId;
    this.id = footprintRequestDto.id;
    this.lastRequestedAt = footprintRequestDto.lastRequestedAt;
    this.createdAt = footprintRequestDto.createdAt;
  }
}
