export class RequestFootprintSqlQueryDto {
  sqlQuery: string;
  constructor(footprintSqlQuery: RequestFootprintSqlQueryDto) {
    this.sqlQuery = footprintSqlQuery.sqlQuery;
  }
}
