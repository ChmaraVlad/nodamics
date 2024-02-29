import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  FootprintExecutedQueryMessageDto,
  RequestFootprintSqlQueryDto,
} from './dto';
import { FootprintExecutionIdDto } from '../footprint-manager';

@Injectable()
export class FootprintIntegrationService {
  logger = new Logger(FootprintIntegrationService.name);
  constructor(private readonly httpService: HttpService) {}
  async requestSQLQuery(footprintSqlQueryDto: RequestFootprintSqlQueryDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('v1/native/async', {
          query: footprintSqlQueryDto.sqlQuery,
        }),
      );
      if (response.data.message === 'success') {
        return new FootprintExecutedQueryMessageDto(response.data);
      }
    } catch (e) {
      this.logger.error(`error requesting sql query: ${e}`);
    }
  }

  async getSQLQuery(footprintExecutionId: FootprintExecutionIdDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `v1/native/${footprintExecutionId.executionId}/results`,
        ),
      );

      this.logger.log(
        `get sql query response ${footprintExecutionId.executionId} message: ${response.data.message} code: ${response.data.code} data: ${response.data.data.result}`,
      );
      if (response.data.message === 'success') {
        return {
          result: response.data.data.result,
        };
      }
    } catch (e) {
      this.logger.error(`error getting sql query: ${e}`);
    }
  }
}
