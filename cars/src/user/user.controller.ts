import { Controller, Post, Body, Get, Patch, Param, Query } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {

  // using Dependency injection here.
  constructor(private userService: UserService) {}

  // Post Method and path /signup
  // @Body is for get properties
  // ValidationPipe to validate and whitelist only send data as body content
  @Post('/signup')
  createUser(@Body(new ValidationPipe({ whitelist: true })) body: CreateUserDto) {
    this.userService.create(body);
  }
  
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOneUser(parseInt(id));
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.findAllUsers(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) body: UpdateUserDto) {
    return this.userService.updateUser(+id, body);
  }
}
