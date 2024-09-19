import { IsString, IsUrl } from 'class-validator';

export class AppConfigModel {
  @IsString()
  TEST: string;

  @IsUrl()
  SUPABASE_URL: string;

  @IsString()
  SUPABASE_SECRET_KEY: string;
}
