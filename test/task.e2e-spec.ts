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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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

  it('Get All Tasks Super', () => {
    return request(app.getHttpServer())
      .get('/task')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(200)
      .then((res) => {
        expect(res.body.allTasks).toBeDefined();
      })
  });

  it('Get Specific Task Super', () => {
    return request(app.getHttpServer())
      .get('/task/2')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(200)
      .then((res) => {
        expect(res.body.task).toBeDefined();
        expect(res.body.task.id).toEqual(2);
      })
  });

  it('Create Task Super', () => {
    return request(app.getHttpServer())
      .post('/task')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({
        title: "Test"
      })
      .expect(201)
      .then((res) => {
        expect(res.body.task).toBeDefined();
        expect(res.body.task.title).toEqual("Test");
        id = res.body.task.id.toString();
      })
  });

  it('Update Task Super', () => {
    return request(app.getHttpServer())
      .put('/task')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({
        id: id,
        status: "IN_PROGRESS"
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toEqual("task updated successfully");
      })
  });

  it('Delete User Super', () => {
    return request(app.getHttpServer())
      .delete('/task')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({
        id: id
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toEqual("task deleted from database");
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

  it('Delete Task Normal Others', () => {
    return request(app.getHttpServer())
      .delete('/task')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({
        id: "2"
      })
      .expect(401)
      .then((res) => {
        expect(res.body.message).toEqual("Unauthorized");
      })
  });

  it('Create Task Normal', () => {
    return request(app.getHttpServer())
      .post('/task')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({
        title: "Test"
      })
      .expect(201)
      .then((res) => {
        expect(res.body.task).toBeDefined();
        expect(res.body.task.title).toEqual("Test");
        id = res.body.task.id.toString();
      })
  });

  it('Delete Task Normal Self', () => {
    return request(app.getHttpServer())
      .delete('/task')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({
        id: id
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toEqual("task deleted from database");
      })
  });
});
