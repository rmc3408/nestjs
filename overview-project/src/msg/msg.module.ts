import { Module } from '@nestjs/common';
import { MsgController } from './msg.controller';
import { MessageRepository } from './msg.repository';
import { MessageService } from './msg.service';

@Module({
  controllers: [MsgController],
  providers: [MessageService, MessageRepository]
})
export class MsgModule {}
