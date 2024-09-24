import { IsString } from 'class-validator';

export class AppConfigModel {
  @IsString()
  TEST: string;

  @IsString()
  DB_URL: string;
}
