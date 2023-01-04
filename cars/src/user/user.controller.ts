import { Controller, Post, Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {

  constructor(private userService: UserService) {}

  @Post('/signup')
  async createUser(@Body(new ValidationPipe({ whitelist: true })) body: CreateUserDto) {
    const savedUser = await this.userService.create(body);
    console.log(body, savedUser);
  }
}
