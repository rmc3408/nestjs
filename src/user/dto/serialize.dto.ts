import { Expose } from 'class-transformer';

export class SerializedUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}