import { UseInterceptors } from '@nestjs/common/decorators';
import { SerializeInterceptor } from './serialize.interceptor';

export function User(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
