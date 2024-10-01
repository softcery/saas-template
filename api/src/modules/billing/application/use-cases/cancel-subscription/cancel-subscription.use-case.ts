import { Inject, Injectable } from '@nestjs/common';

import { BillingDiToken } from '~modules/billing/infrastructure/stripe/constants';
import { IDbContext } from '~shared/application/services/db-context.interface';
import { UseCase } from '~shared/application/use-case/use-case.interface';
import { BaseToken } from '~shared/constants';

import { SubscriptionActionDto } from '../../dto/subscription-action.dto';
import { CustomerForUserDoesNotExistException } from '../../exceptions/customer-for-user-does-not-exist.exception';
import { CustomerHasAlreadyCanceledSubscriptionException } from '../../exceptions/customer-has-already-canceled-subscription.exception';
import { CustomerNotSubscribedException } from '../../exceptions/customer-not-subscribed.exception';
import { ISubscriptionPlanService } from '../../services/subscription-plan-service.interface';
import { ICancelSubscriptionPayload, ICancelSubscriptionUseCase } from './cancel-subscription-use-case.interface';

@Injectable()
export class CancelSubscriptionUseCase
  extends UseCase<ICancelSubscriptionPayload, SubscriptionActionDto>
  implements ICancelSubscriptionUseCase
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

    if (paymentCustomer.subscriptionCanceled) throw new CustomerHasAlreadyCanceledSubscriptionException();
    if (!paymentCustomer.hasActiveSubscription) throw new CustomerNotSubscribedException();

    const subscriptionAction = await this.subscriptionPlanService.createCancelPlanAction(
      paymentCustomer.providerCustomerId,
      paymentCustomer.subscriptionProviderId,
    );

    return subscriptionAction;
  }
}
