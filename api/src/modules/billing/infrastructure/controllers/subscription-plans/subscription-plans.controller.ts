import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IListSubscriptionPlansUseCase } from '~modules/billing/application/use-cases/list-subscription-plans/list-subscription-plans-use-case.interface';

import { BillingDiToken } from '../../stripe/constants';

@ApiTags('Subscription plans')
@Controller('subscription/plans')
export class SubscriptionPlansController {
  constructor(
    @Inject(BillingDiToken.LIST_SUBSCRIPTION_PLANS_USE_CASE)
    private readonly listSubscriptionPlansUseCase: IListSubscriptionPlansUseCase,
  ) {}

  @Get()
  public listSubscriptionPlans() {
    return this.listSubscriptionPlansUseCase.execute();
  }
}
