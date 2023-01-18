import { Transform } from 'class-transformer';
import { IsNumber, IsString, Max, Min, IsLatitude, IsLongitude } from 'class-validator';

// It is a validation of Schema model - it must be used with Pipeline
export class GetEstimateDto {

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(type => parseInt(type.value))
  @Min(1930)
  @Max(2050)
  @IsNumber()
  year: number;

  @Transform(type => parseFloat(type.value))
  @IsLatitude()
  latitude: number;

  @Transform(type => parseFloat(type.value))
  @IsLongitude()
  longitude: number;

  @Transform(type => parseInt(type.value))
  @IsNumber()
  @Min(0)
  @Max(10000000)
  mileage: number;

}