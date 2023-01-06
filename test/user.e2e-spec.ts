import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('User Routes (e2e)', () => {
  let app: INestApplication;
  const emailNormal = "test2@gmail.com";
  const emailSuper = "test@gmail.com";
  let jwtToken = "";
  let id = "";

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
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toEqual(email);
        id = res.body.user.id.toString();
      })
  });

  it('Log In Super', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: emailSuper,
        password: "Test1234"
      })
      .expect(201)
      .then((res) => {
        expect(res.body.token).toBeDefined();
        jwtToken = res.body.token;
      })
  });

  it('Get All Users Super', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(200)
      .then((res) => {
        expect(res.body.allUsers).toBeDefined();
      })
  });

  it('Get Specific User Super', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(200)
      .then((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.id).toEqual(1);
      })
  });

  it('Update User Super', () => {
    return request(app.getHttpServer())
      .put('/user')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({
        id: id,
        user_type: "ADMIN"
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toEqual("user updated successfully");
      })
  });

  it('Delete User Super', () => {
    return request(app.getHttpServer())
      .delete('/user')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({
        id: id
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toEqual("user deleted from database");
      })
  });

  it('Log In Normal', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: emailNormal,
        password: "Test1234"
      })
      .expect(201)
      .then((res) => {
        expect(res.body.token).toBeDefined();
        jwtToken = res.body.token;
      })
  });

  it('Get All Users Normal', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toEqual("Unauthorized");
      })
  });

  it('Get Specific User Normal Self', () => {
    return request(app.getHttpServer())
      .get('/user/9')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(200)
      .then((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.id).toEqual(9);
      })
  });

  it('Get Specific User Normal Others', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toEqual("Unauthorized");
      })
  });

  it('Update User Normal', () => {
    return request(app.getHttpServer())
      .put('/user')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({
        id: id,
        user_type: "ADMIN"
      })
      .expect(401)
      .then((res) => {
        expect(res.body.message).toEqual("Unauthorized");
      })
  });

  it('Delete User Normal', () => {
    return request(app.getHttpServer())
      .delete('/user')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({
        id: id
      })
      .expect(401)
      .then((res) => {
        expect(res.body.message).toEqual("Unauthorized");
      })
  });
});
