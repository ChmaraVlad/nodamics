import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import * as compression from 'compression';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const server = express();
  server.use(compression());
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);
  app.enableShutdownHooks();
  app.enableCors({
    origin: [
      configService.get('WEBSITE_URL'),
      configService.get('WEBSITE_DOMAIN'),
    ],
    allowedHeaders: [
      'content-type',
      'compression',
      'Accept-Encoding',
      'Content-Encoding',
      ...supertokens.getAllCORSHeaders(),
    ],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());

  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port'));
}
void bootstrap();
