import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();
  });

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@test.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'entrepreneur'
      })
      .expect(201)
      .expect(res => {
        expect(res.body.data.access_token).toBeDefined();
      });
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      })
      .expect(200)
      .expect(res => {
        authToken = res.body.data.access_token;
        expect(authToken).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
