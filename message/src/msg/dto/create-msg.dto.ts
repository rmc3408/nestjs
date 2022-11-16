import { IsString, IsInt } from 'class-validator';

export class CreateMsgDto {
  @IsString()
  payload: string;

  @IsInt()
  size: number;
}
