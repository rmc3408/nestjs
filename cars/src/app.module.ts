import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { ReportEntity } from './report/report.entity';
import * as cookies from 'express-session';

@Module({
  imports: [ 
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}`
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DB_FILENAME'),
        entities: [UserEntity, ReportEntity],
        synchronize: true //do migration everytime starts.
    })
  }),
  // Use this without .ENV files
  // TypeOrmModule.forRoot({
  //   type: 'sqlite',
  //   database: 'udemy.cars.nestjs.sqlite',
  //   entities: [UserEntity, ReportEntity],
  //   synchronize: true
  // }), 
  UserModule, 
  ReportModule],
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
