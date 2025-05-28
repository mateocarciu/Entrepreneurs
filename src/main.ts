import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { InterestsService } from './interests/interests.service';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';

async function main() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Global middleware
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Entrepreneur Platform API')
    .setDescription('API for connecting entrepreneurs and investors')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.register(helmet);

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '15 minutes',
  });

  app.enableCors();

  // Seed default interests
  const interestsService = app.get(InterestsService);
  await interestsService.seedDefaultInterests();

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
main();
