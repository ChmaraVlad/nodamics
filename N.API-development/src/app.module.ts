import { Module } from '@nestjs/common';
import appConfig from './config/app.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user';
import { GoogleApisModule } from './google-apis';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './error';
import { ProjectModule } from './project';
import { DiagramModule } from './diagram';
import { TeamModule } from './team';
import { MulterModule } from '@nestjs/platform-express';
import { SpreadsheetModule } from './spreadsheet';
import { OnAppInitModule } from './on-app-init';
import { DiagramEditorModule } from './diagram-editor';
import { FootprintManagerModule } from './footprint-manager';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    PrismaModule,
    AuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connectionURI: configService.get('SUPERTOKENS_URL'),
        appInfo: {
          appName: 'game',
          apiDomain: configService.get('API_URL'),
          websiteDomain: configService.get('WEBSITE_URL'),
          apiBasePath: '/api/auth',
          websiteBasePath: '/auth',
        },
      }),
    }),
    UserModule,
    GoogleApisModule,
    ProjectModule,
    DiagramModule,

    TeamModule,
    SpreadsheetModule,
    OnAppInitModule,
    FootprintManagerModule,
    DiagramEditorModule,
    OpenaiModule,
    // DiagramModule,
    // DiagramTagModule,
    // DashboardModule,
  ],
  providers: [
    {
      useClass: HttpExceptionFilter,
      provide: APP_FILTER,
    },
  ],
})
export class AppModule {}
