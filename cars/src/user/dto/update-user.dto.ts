import { IsEmail, IsString, IsOptional } from 'class-validator';

// It is a validation of Schema model - it must be used with Pipeline
export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}