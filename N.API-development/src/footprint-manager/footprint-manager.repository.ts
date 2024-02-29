import { Injectable } from '@nestjs/common';
import {
  CreatedFootprintRequestDto,
  NewFootprintSqlQueryDto,
  NewSqlQueryResultDto,
  QueryFootprintSqlQueriesDto,
} from './dto';
import { PrismaService } from '../prisma';

@Injectable()
export class FootprintManagerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getSQLQuery({ sqlQuery }: { sqlQuery: string }) {
    return this.footprintSQLQuery.findUnique({
      where: {
        sqlQuery,
      },
    });
  }
  createSQLQuery(request: NewFootprintSqlQueryDto) {
    return this.footprintSQLQuery.create({
      data: {
        sqlQuery: request.sqlQuery,
        projectId: request.projectId,
      },
    });
  }

  createSQLRequest(request: CreatedFootprintRequestDto) {
    return this.footprintRequest.create({
      data: {
        footprintSQLQueryId: request.sqlQueryId,
        executionId: request.executionId,
      },
    });
  }

  getRequests() {
    return this.footprintRequest.findMany();
  }

  getRequest({ footprintSQLQueryId }: { footprintSQLQueryId: string }) {
    return this.footprintRequest.findFirst({
      where: {
        footprintSQLQueryId,
      },
    });
  }

  saveSQLQueryResult(newSqlQueryResultDto: NewSqlQueryResultDto) {
    return this.footprintSQLQuery.update({
      data: {
        lastUpdatedAt: newSqlQueryResultDto.lastUpdatedAt,
        result: newSqlQueryResultDto.result,
      },
      where: {
        id: newSqlQueryResultDto.footprintSQLQueryId,
      },
    });
  }

  deleteSQLRequest({ footprintRequestId }: { footprintRequestId: string }) {
    return this.footprintRequest.delete({
      where: {
        id: footprintRequestId,
      },
    });
  }

  getOutdatedSQLQueries({ timeAgo }: { timeAgo: Date }) {
    return this.footprintSQLQuery.findMany({
      where: {
        lastUpdatedAt: {
          lt: timeAgo,
        },
      },
    });
  }

  getFootprintQueries(
    queryFootprintSqlQueriesDto: QueryFootprintSqlQueriesDto,
  ) {
    return this.footprintSQLQuery.findMany({
      where: {
        diagramId: queryFootprintSqlQueriesDto.diagramId,
      },
    });
  }

  private get footprintSQLQuery() {
    return this.prismaService.footprintSQLQuery;
  }

  private get footprintRequest() {
    return this.prismaService.footprintRequest;
  }
}
