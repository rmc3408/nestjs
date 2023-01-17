import { Expose, Transform } from 'class-transformer';

export class SerializedReportDto {
  @Expose()
  id: number;
  
  @Transform((entity) => entity.obj.user.id)
  @Expose()
  userId: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  mileage: number;
}