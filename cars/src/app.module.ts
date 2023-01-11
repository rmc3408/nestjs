import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { ReportEntity } from './report/report.entity';
import * as cookies from 'express-session';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'udemy.cars.nestjs.sqlite',
    entities: [UserEntity, ReportEntity],
    synchronize: true
  }), UserModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookies({
      secret: 'a',
      resave: false,
      saveUninitialized: false
    })).forRoutes('*')
  }
}
