import { Inject, Injectable } from '@nestjs/common';

import { BillingDiToken } from '~modules/billing/infrastructure/stripe/constants';
import { Command } from '~shared/application/CQS/command.abstract';
import { IDbContext } from '~shared/application/services/db-context.interface';
import { BaseToken } from '~shared/constants';

import { SubscriptionActionDto } from '../../dto/subscription-action.dto';
import { CustomerForUserDoesNotExistException } from '../../exceptions/customer-for-user-does-not-exist.exception';
import { CustomerNotSubscribedException } from '../../exceptions/customer-not-subscribed.exception';
import { ISubscriptionPlanService } from '../../services/subscription-plan-service.interface';
import { IUpgradeSubscriptionPayload, IUpgradeSubscriptionUseCase } from './upgrade-subscription-use-case.interface';

@Injectable()
export class UpgradeSubscriptionUseCase
  extends Command<IUpgradeSubscriptionPayload, SubscriptionActionDto>
  implements IUpgradeSubscriptionUseCase
{
  constructor(
    @Inject(BillingDiToken.SUBSCRIPTION_PLANS_PROVIDER_SERVICE)
    private readonly subscriptionPlanService: ISubscriptionPlanService,
    @Inject(BaseToken.DB_CONTEXT) private readonly dbContext: IDbContext,
  ) {
    super();
  }

  public async implementation(): Promise<SubscriptionActionDto> {
    const { userId } = this._input;

    const paymentCustomer = await this.dbContext.paymentCustomerRepository.findByUserId(userId);

    if (!paymentCustomer) {
      throw new CustomerForUserDoesNotExistException(userId);
    }

    if (!paymentCustomer.hasActiveSubscription) throw new CustomerNotSubscribedException();

    const subscriptionAction = await this.subscriptionPlanService.createUpdatePlanPaymentAction(
      paymentCustomer.providerCustomerId,
      paymentCustomer.paymentPlan.subscriptionProviderId,
    );

    return subscriptionAction;
  }
}
