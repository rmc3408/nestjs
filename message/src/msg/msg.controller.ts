import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { CreateMsgDto } from './dto/create-msg.dto';
import { ValidationPipe } from '@nestjs/common';


@Controller('msg')
export class MsgController {
  @Get()
  listMessages() {
    return 'hi'
  }

  @Post()
  createMessage(@Body(new ValidationPipe()) body: CreateMsgDto) {
    console.log('Validated body is', body)
  }

  @Get('/:id')
  getMessage(@Param('id') arg: string) {
    console.log('id is', arg)
  }

}
