import { ApiProperty } from '@nestjs/swagger';

import { SubscriptionPlanDto } from './subscription-plan.dto';

export class SubscriptionPlanListDto {
  @ApiProperty({ type: SubscriptionPlanDto, isArray: true })
  public list: SubscriptionPlanDto[];
  constructor(list: SubscriptionPlanDto[]) {
    this.list = list;
  }
}
