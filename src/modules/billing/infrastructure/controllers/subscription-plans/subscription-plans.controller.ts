import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListSubscriptionPlansUseCase } from '~modules/billing/application/use-cases/list-subscription-plans/list-subscription-plans.use-case';

@ApiTags('Subscription plans')
@Controller('subscription/plans')
export class SubscriptionPlansController {
  constructor(private readonly listSubscriptionPlansUseCase: ListSubscriptionPlansUseCase) {}

  @Get()
  public listSubscriptionPlans() {
    return this.listSubscriptionPlansUseCase.execute();
  }
}
