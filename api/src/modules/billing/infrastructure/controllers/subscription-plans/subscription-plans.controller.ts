import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { IListSubscriptionPlansUseCase } from '~modules/billing/application/use-cases/list-subscription-plans/list-subscription-plans-use-case.interface';

import { BillingDiToken } from '../../stripe/constants';

@ApiTags('billing')
@Controller('subscription/plans')
export class SubscriptionPlansController {
  constructor(
    @Inject(BillingDiToken.LIST_SUBSCRIPTION_PLANS_USE_CASE)
    private readonly listSubscriptionPlansUseCase: IListSubscriptionPlansUseCase,
  ) {}

  @ApiOperation({
    operationId: 'listSubscriptionPlans',
  })
  @Get()
  public listSubscriptionPlans() {
    return this.listSubscriptionPlansUseCase.execute();
  }
}
