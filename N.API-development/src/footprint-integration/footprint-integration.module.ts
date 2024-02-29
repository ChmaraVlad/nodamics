import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FootprintIntegrationService } from './footprint-integration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 3,
        baseURL: 'https://api.footprint.network/api',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          'api-key': configService.get('FOOTPRINT_API_KEY'),
        },
      }),
    }),
  ],
  providers: [FootprintIntegrationService],
  exports: [FootprintIntegrationService],
})
export class FootprintIntegrationModule {}
