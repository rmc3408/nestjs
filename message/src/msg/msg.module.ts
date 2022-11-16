import { Module } from '@nestjs/common';
import { MsgController } from './msg.controller';

@Module({
  controllers: [MsgController]
})
export class MsgModule {}
