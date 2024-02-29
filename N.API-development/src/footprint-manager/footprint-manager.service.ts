import { Injectable, Logger } from '@nestjs/common';
import {
  FootprintIntegrationService,
  RequestFootprintSqlQueryDto,
} from '../footprint-integration';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MOCK_FOOTPRINT_SQL_QUERY } from '../mock';
import { FootprintManagerRepository } from './footprint-manager.repository';
import {
  CreatedFootprintRequestDto,
  CreateFootprintRequestDto,
  FootprintExecutionIdDto,
  FootprintSqlQueryDto,
  NewFootprintSqlQueryDto,
  NewSqlQueryResultDto,
  QueryFootprintSqlQueriesDto,
} from './dto';
import { JSONUtil, TimeUtil } from '../utils';

@Injectable()
export class FootprintManagerService {
  private readonly logger = new Logger(FootprintManagerService.name);

  constructor(
    private readonly footprintIntegrationService: FootprintIntegrationService,
    private readonly footprintManagerRepository: FootprintManagerRepository,
  ) {}

  async requestSQLQuery(createFootprintRequestDto: CreateFootprintRequestDto) {
    // check if request exists already exists to prevent duplication
    const savedRequest = await this.footprintManagerRepository.getRequest({
      footprintSQLQueryId: createFootprintRequestDto.sqlQueryId,
    });
    if (!savedRequest) {
      const response = await this.footprintIntegrationService.requestSQLQuery(
        new RequestFootprintSqlQueryDto({
          sqlQuery: createFootprintRequestDto.sqlQuery,
        }),
      );
      if (response) {
        await this.footprintManagerRepository.createSQLRequest(
          new CreatedFootprintRequestDto({
            ...createFootprintRequestDto,
            executionId: response.data.execution_id,
          }),
        );
        return response;
      }
    }
  }

  async createNewFootprintSQLQuery() {
    const sqlQuery = MOCK_FOOTPRINT_SQL_QUERY;
    // check if sql query exists already
    let savedSQLQuery = await this.footprintManagerRepository.getSQLQuery({
      sqlQuery,
    });
    // if no sql query exists, create it
    if (!savedSQLQuery) {
      savedSQLQuery = await this.footprintManagerRepository.createSQLQuery(
        new NewFootprintSqlQueryDto({
          sqlQuery,
        }),
      );
    }

    return this.requestSQLQuery(
      new CreateFootprintRequestDto({
        sqlQueryId: savedSQLQuery.id,
        sqlQuery,
      }),
    );
  }

  async getFootprintQueries(
    queryFootprintSqlQueriesDto: QueryFootprintSqlQueriesDto,
  ) {
    const savedQueries =
      await this.footprintManagerRepository.getFootprintQueries(
        queryFootprintSqlQueriesDto,
      );

    return savedQueries.map((savedQuery) => {
      return new FootprintSqlQueryDto({
        id: savedQuery.id,
        sqlQuery: savedQuery.sqlQuery,
        projectId: savedQuery.projectId,
        result: JSONUtil.validateJSON(savedQuery.result),
      });
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleSQLQueryResult() {
    // Set turn true to run request to update data
    const isRunRequest = true;
    const sqlRequests = await this.footprintManagerRepository.getRequests();
    const at = new Date();

    const sqlRequestsIds = sqlRequests.map((sqlRequest) => sqlRequest.id);

    this.logger.log(
      `get sql requests at: ${at}, ${JSON.stringify(sqlRequestsIds, null, 2)}`,
    );

    if (isRunRequest) {
      await Promise.allSettled(
        sqlRequests.map(async (sqlRequest) => {
          const footprintSQLQueryResult =
            await this.footprintIntegrationService.getSQLQuery(
              new FootprintExecutionIdDto({
                executionId: sqlRequest.executionId,
              }),
            );
          if (footprintSQLQueryResult) {
            await this.footprintManagerRepository.saveSQLQueryResult(
              new NewSqlQueryResultDto({
                footprintSQLQueryId: sqlRequest.footprintSQLQueryId,
                lastUpdatedAt: new Date(),
                result: footprintSQLQueryResult.result,
              }),
            );
          }

          await this.footprintManagerRepository.deleteSQLRequest({
            footprintRequestId: sqlRequest.id,
          });
        }),
      );
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async updateFootprintData() {
    const minutesAgo = 30;
    const timeAgo = TimeUtil.timeAgo(minutesAgo, 'minutes');
    this.logger.debug(
      'Update footprint data which have been updated to: ',
      timeAgo,
    );
    const sqlQueriesToUpdate =
      await this.footprintManagerRepository.getOutdatedSQLQueries({
        timeAgo,
      });
    await Promise.allSettled(
      sqlQueriesToUpdate.map(async (sqlQuery) => {
        await this.requestSQLQuery(
          new CreateFootprintRequestDto({
            sqlQueryId: sqlQuery.id,
            sqlQuery: sqlQuery.sqlQuery,
          }),
        );
      }),
    );
    const sqlQueriesToUpdateIds = sqlQueriesToUpdate.map(
      (sqlQuery) => sqlQuery.id,
    );
    this.logger.debug(
      `sqlResultsToUpdate ${JSON.stringify(sqlQueriesToUpdateIds, null, 2)}`,
    );
  }
}
