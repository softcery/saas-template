import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserId } from '~modules/auth/infrastructure/decorators/user-id/user-id.decorator';
import { IGetPaymentCustomerUseCase } from '~modules/billing/application/use-cases/get-payment-customer/get-payment-customer-use-case.interface';
import { IListSubscriptionPlansUseCase } from '~modules/billing/application/use-cases/list-subscription-plans/list-subscription-plans-use-case.interface';

import { BillingDiToken } from '../../stripe/constants';

@ApiTags('billing')
@Controller('subscription')
export class SubscriptionPlansController {
  constructor(
    @Inject(BillingDiToken.LIST_SUBSCRIPTION_PLANS_USE_CASE)
    private readonly listSubscriptionPlansUseCase: IListSubscriptionPlansUseCase,
    @Inject(BillingDiToken.GET_PAYMENT_CUSTOMER_USE_CASE)
    private readonly getPaymentCustomerUseCase: IGetPaymentCustomerUseCase,
  ) {}

  @ApiOperation({
    operationId: 'listSubscriptionPlans',
  })
  @Get('plans')
  public listSubscriptionPlans() {
    return this.listSubscriptionPlansUseCase.execute();
  }

  @ApiOperation({
    operationId: 'getPaymentCustomer',
  })
  @Get('customer')
  public getPaymentCustomer(@UserId() userId: string) {
    return this.getPaymentCustomerUseCase.execute({ userId });
  }
}
