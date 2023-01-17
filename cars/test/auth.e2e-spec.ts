import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { rm } from 'fs';
import { join } from 'path';


const userLogin = {
  email: "molinaro@gmail.com",
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

  afterEach(async () => {
    // console.log(join(__dirname, '..', 'udemy.cars.test.sqlite'));
    await rm(join( __dirname , '..', 'udemy.cars.test.sqlite'), (err) => {
      if (err) return;
      //console.log("Deleted Database File successfully.");
    });
  })

  test('sign Up', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(userLogin)
      .expect(201)
      .then((res) => {
        console.log(res.body);
        expect(res.body.id).toBeDefined();
      })
  });

  test('signIn and get who is the user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userLogin)
      .expect(201)
    const cookieDefined = response.get('Set-Cookie');

    const final = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookieDefined)
      .expect(200)

    expect(final.body.email).toEqual(userLogin.email)  
  });
});
