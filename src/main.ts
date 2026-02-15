import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Express } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('MkStore API Gateway')
    .setDescription('Public API entry point for the system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    jsonDocumentUrl: '/api/docs/json',
  });

  // Scalar middleware
  const adapter = app.getHttpAdapter();
  if (!(adapter instanceof ExpressAdapter)) {
    throw new Error('Scalar docs require Express adapter');
  }

  const server: Express = adapter.getInstance();

  server.use(
    '/api/docs/scalar',
    apiReference({
      spec: {
        url: '/api/docs/json',
      },
    })
  );

  // if (process.env.NODE_ENV === 'production') {
  //   app.use('/api/docs/scalar', authGuard);
  // }

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}

bootstrap().catch((error) => {
  console.error('Error starting application (Api Gateway):', error);
  process.exit(1);
});
