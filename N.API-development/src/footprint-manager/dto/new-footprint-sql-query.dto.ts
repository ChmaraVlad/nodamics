export class NewFootprintSqlQueryDto {
  id?: string;
  sqlQuery: string;
  projectId?: string;

  constructor(data: NewFootprintSqlQueryDto) {
    this.id = data.id;
    this.sqlQuery = data.sqlQuery;
    this.projectId = data.projectId;
  }
}
