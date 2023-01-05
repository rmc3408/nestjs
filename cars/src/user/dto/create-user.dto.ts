import { IsEmail, IsString } from 'class-validator';

// It is a validation of Schema model - it must be used with Pipeline
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}