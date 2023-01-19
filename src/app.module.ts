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
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: process.env.CRUNCHY_POSTGRES_COBALT_DATABASE_URL,
        //type: 'sqlite',
        //database: config.get<string>('DB_FILENAME'),
        entities: [UserEntity, ReportEntity],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
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
  providers: [AppService, ConfigService],
})


export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookies({
      secret: this.configService.get<string>('COOKIE_KEY'),
      resave: false,
      saveUninitialized: false
    })).forRoutes('*')
  }
}
