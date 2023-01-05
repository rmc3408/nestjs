import { Controller, Post, Body, Get, Patch, Param, Query, Delete } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { User } from 'src/interceptor/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { SerializedUserDto } from './dto/serialize.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';


@User(SerializedUserDto) // To customize the final response body, use interceptors
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
