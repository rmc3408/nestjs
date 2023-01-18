import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from '../middleware/current-user.middleware';


// Responsible to connect all classes and provide Dependency Injection on them
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], //import repository User in Provider or controllers.
  providers: [UserService, AuthService],
  controllers: [UserController]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
