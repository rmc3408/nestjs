import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  Session,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SerializedUserDto } from './dto/serialize.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@User(SerializedUserDto) // To customize the final response body, use interceptors
@Controller('auth')
export class UserController {
  // using Dependency injection here.
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // Post Method and path /signup
  // @Body is for get properties
  // ValidationPipe to validate and whitelist only send data as body content
  @Post('/signup')
  async createUser(
    @Body(new ValidationPipe({ whitelist: true })) body: CreateUserDto,
  ) {
    const user = await this.authService.signUp(body);
    return user;
  }

  @Post('/signin')
  async signInUser(
    @Body(new ValidationPipe()) body: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signIn(body);
    session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@Session() session: any) {
    return this.userService.findOneUser(session.userId);
  }

  @Get('/whoUser')
  whoUser(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Post('/signout')
  async signOutUser(@Session() session: any) {
    session.userId = null;
  }

  @Get('/session')
  getColor(@Session() session: any) {
    return session.color;
  }

  @Get('/session/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.findAllUsers(email);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOneUser(parseInt(id));
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: UpdateUserDto,
  ) {
    return this.userService.updateUser(+id, body);
  }
}
