export class NewSqlQueryResultDto {
  footprintSQLQueryId: string;
  lastUpdatedAt: Date;
  result: string;
  constructor(data: NewSqlQueryResultDto) {
    this.footprintSQLQueryId = data.footprintSQLQueryId;
    this.lastUpdatedAt = data.lastUpdatedAt;
    this.result = data.result;
  }
}
