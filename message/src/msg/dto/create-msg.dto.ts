import { IsString } from 'class-validator';

export class CreateMsgDto {
  @IsString()
  payload: string;

  // @IsInt()
  // size: number;
}
