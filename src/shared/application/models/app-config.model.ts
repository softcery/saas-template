import { IsInt, IsPositive, IsString } from 'class-validator';

export class AppConfigModel {
  @IsString()
  TEST: string;

  @IsString()
  STRIPE_API_KEY: string;

  @IsString()
  BILLING_SUCCESS_REDIRECT_URL: string;

  @IsInt()
  @IsPositive()
  DD_TRIAL_PERIOD_DURATION_DAYS: number;
}
