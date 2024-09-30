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

  @IsString()
  STRIPE_API_KEY: string;

  @IsString()
  BILLING_SUCCESS_REDIRECT_URL: string;

  @IsInt()
  @IsPositive()
  DD_TRIAL_PERIOD_DURATION_DAYS: number;

  @IsString()
  DD_STRIPE_WEBHOOK_SIGNING_SECRET: string;
}
