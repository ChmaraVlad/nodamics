export class FootprintSqlQueryDto {
  id?: string;
  sqlQuery: string;
  projectId?: string;
  result: JSON | false;

  constructor(data: FootprintSqlQueryDto) {
    this.id = data.id;
    this.sqlQuery = data.sqlQuery;
    this.projectId = data.projectId;
    this.result = data.result;
  }
}
