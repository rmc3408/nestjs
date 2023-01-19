import { UseInterceptors } from '@nestjs/common/decorators';
import { SerializeInterceptor } from '../interceptor/serialize.interceptor';

export function customResponseSerializer(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
