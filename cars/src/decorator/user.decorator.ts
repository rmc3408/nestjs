import { UseInterceptors } from '@nestjs/common/decorators';
import { SerializeInterceptor } from '../interceptor/serialize.interceptor';

export function User(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
