import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from '../interceptor/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';


// Responsible to connect all classes and provide Dependency Injection on them
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], //import repository User in Provider or controllers.
  providers: [UserService, AuthService, {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
  }],
  controllers: [UserController]
})
export class UserModule {}
