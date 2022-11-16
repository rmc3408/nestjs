import { NestFactory } from '@nestjs/core';
import { MsgModule } from './msg/msg.module';

async function bootstrap() {
  const app = await NestFactory.create(MsgModule);
  await app.listen(3000);
}
bootstrap();
