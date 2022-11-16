import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('msg')
export class MsgController {
  @Get()
  listMessages() {
    return 'hi'
  }

  @Post()
  createMessage(@Body() body: string) {
    console.log('body is', body)
  }

  @Get('/:id')
  getMessage(@Param('id') arg: string) {
    console.log('id is', arg)
  }

}
