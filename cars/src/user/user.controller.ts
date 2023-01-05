import { Controller, Post, Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {

  // using Dependency injection here.
  constructor(private userService: UserService) {}

  // Post Method and path /signup
  // @Body is for get properties
  // ValidationPipe to validate and whitelist only send data as body content
  @Post('/signup')
  async createUser(@Body(new ValidationPipe({ whitelist: true })) body: CreateUserDto) {
    await this.userService.create(body);
  }
}
