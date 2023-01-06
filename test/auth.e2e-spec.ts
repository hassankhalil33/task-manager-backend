import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication (e2e)', () => {
  let app: INestApplication;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = 10;

  for (var i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const email = `${result}@gmail.com`

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Registering', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: email,
        password: "Test1234"
      })
      .expect(201)
      .then((res) => {
        expect(res.body.message).toEqual("registered successfully")
      })
  });

  it('Logging In', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: email,
        password: "Test1234"
      })
      .expect(201)
      .then((res) => {
        expect(res.body.token).toBeDefined
      })
  });
});
