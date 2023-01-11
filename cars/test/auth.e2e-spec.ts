import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


const userLogin = {
  email: "molinaro321@gmail.com",
  password: "secret@123"
}

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('sign Up - POST', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(userLogin)
      .expect(201)
      .then((res) => {
        console.log(res.body);
        expect(res.body.id).toBeDefined();
      })
  });
});
