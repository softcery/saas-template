import { Inject, Injectable } from '@nestjs/common';

import { BillingDiToken } from '~modules/billing/infrastructure/stripe/constants';
import { UseCase } from '~shared/application/use-case/use-case.interface';

import { SubscriptionActionDto } from '../../dto/subscription-action.dto';
import { CustomerForUserDoesNotExistException } from '../../exceptions/customer-for-user-does-not-exist.exception';
import { CustomerNotSubscribedException } from '../../exceptions/customer-not-subscribed.exception';
import { IPaymentCustomerRepository } from '../../repositories/payment-customer-repository.interface';
import { ISubscriptionPlanService } from '../../services/subscription-plan-service.interface';
import { IUpgradeSubscriptionPayload, IUpgradeSubscriptionUseCase } from './upgrade-subscription-use-case.interface';

@Injectable()
export class UpgradeSubscriptionUseCase
  extends UseCase<IUpgradeSubscriptionPayload, SubscriptionActionDto>
  implements IUpgradeSubscriptionUseCase
{
  constructor(
    @Inject(BillingDiToken.SUBSCRIPTION_PLANS_PROVIDER_SERVICE)
    private readonly subscriptionPlanService: ISubscriptionPlanService,
    @Inject(BillingDiToken.PAYMENT_CUSTOMER_REPOSITORY)
    private readonly paymentCustomerRepository: IPaymentCustomerRepository,
  ) {
    super();
  }

  public async implementation(): Promise<SubscriptionActionDto> {
    const { userId } = this._input;

    const paymentCustomer = await this.paymentCustomerRepository.findByUserId(userId);
    if (!paymentCustomer) {
      throw new CustomerForUserDoesNotExistException(userId);
    }

    if (!paymentCustomer.hasActiveSubscription) throw new CustomerNotSubscribedException();

    const subscriptionAction = await this.subscriptionPlanService.createUpdatePlanPaymentAction(
      paymentCustomer.providerCustomerId,
      paymentCustomer.subscriptionProviderId,
    );

    return subscriptionAction;
  }
}
