import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMsgDto } from './dto/create-msg.dto';
import { ValidationPipe } from '@nestjs/common';
import { MessageService } from './msg.service';


@Controller('msg')
export class MsgController {
  constructor(public msgService: MessageService) {}

  @Get()
  listMessages() {
    return this.msgService.findAll();
  }

  @Post()
  createMessage(@Body(new ValidationPipe()) body: CreateMsgDto) {
    //console.log('Validated body is', body);
    return this.msgService.create(body.payload);
  }

  @Get('/:id')
  async getMessage(@Param('id') arg: string) {
    //console.log('id is', arg)
    const result = await this.msgService.findOne(arg);
    if (!result) throw new NotFoundException('ID not found')
    return result;
  }

}
