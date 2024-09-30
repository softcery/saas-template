import { IsInt, IsPositive, IsString, IsUrl } from 'class-validator';

export class AppConfigModel {
  @IsString()
  TEST: string;

  @IsString()
  DB_URL: string;

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

  @IsString()
  DD_PASSWORD_RESET_REDIRECT_URL: string;

  @IsInt()
  @IsPositive()
  DD_PASSWORD_RECOVERY_TIME: number;
}
