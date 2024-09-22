import { IsString, IsUrl } from 'class-validator';

export class AppConfigModel {
  @IsString()
  TEST: string;

  @IsUrl()
  SUPABASE_URL: string;

  @IsString()
  SUPABASE_SECRET_KEY: string;

  @IsString()
  GOOGLE_OAUTH_CLIENT_ID: string;

  @IsString()
  GOOGLE_OAUTH_SECRET: string;

  @IsString()
  GOOGLE_OAUTH_CALLBACK_URL: string;
}
