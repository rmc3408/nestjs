import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMsgDto } from './dto/create-msg.dto';
import { ValidationPipe } from '@nestjs/common';
import { MessageService } from './msg.service';


@Controller('msg')
export class MsgController {
  service: MessageService;

  constructor() {
    this.service = new MessageService();
  }

  @Get()
  listMessages() {
    return this.service.findAll();
  }

  @Post()
  createMessage(@Body(new ValidationPipe()) body: CreateMsgDto) {
    //console.log('Validated body is', body);
    return this.service.create(body.payload);
  }

  @Get('/:id')
  async getMessage(@Param('id') arg: string) {
    //console.log('id is', arg)
    const result = await this.service.findOne(arg);
    if (!result) throw new NotFoundException('ID not found')
    return result;
  }

}
