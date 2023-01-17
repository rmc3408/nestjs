import { IsNotEmpty, IsNumber, IsString, Max, Min, IsLatitude, IsLongitude } from 'class-validator';

// It is a validation of Schema model - it must be used with Pipeline
export class CreateReportDto {
  
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(99999.99)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Min(1930)
  @Max(2050)
  @IsNumber()
  year: number;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsNumber()
  @Min(0)
  @Max(10000000)
  mileage: number;

  user: {};
}