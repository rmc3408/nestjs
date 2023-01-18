import { IsBoolean } from 'class-validator';

// It is a validation of Schema model - it must be used with Pipeline
export class UpdateReportDto {
  @IsBoolean()
  aproved: boolean;
}