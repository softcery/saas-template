import { IsString } from 'class-validator';

export class AppConfigModel {
  @IsString()
  TEST: string;
}
