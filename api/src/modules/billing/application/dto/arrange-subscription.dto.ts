import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ArrangeSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  planId: string;

  @IsBoolean()
  useTrial: boolean;
}
