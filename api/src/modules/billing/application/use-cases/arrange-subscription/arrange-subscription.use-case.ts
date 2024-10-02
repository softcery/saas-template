import { Inject, Injectable } from '@nestjs/common';

import { BillingDiToken } from '~modules/billing/infrastructure/stripe/constants';
import {
  PaymentPlanOptions,
  TrialOptions,
} from '~modules/billing/infrastructure/stripe/models/payment-plan-options.model';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { IDbContext } from '~shared/application/services/db-context.interface';
import { UseCase } from '~shared/application/use-cases/use-case.abstract';
import { BaseToken } from '~shared/constants';

import { SubscriptionActionDto } from '../../dto/subscription-action.dto';
import { CustomerAlreadyHasSubscriptionException } from '../../exceptions/customer-already-has-subscription.exception';
import { CustomerForUserDoesNotExistException } from '../../exceptions/customer-for-user-does-not-exist.exception';
import { ISubscriptionPlanService } from '../../services/subscription-plan-service.interface';
import { IArrangeSubscriptionPayload, IArrangeSubscriptionUseCase } from './arrange-subscription-use-case.interface';

@Injectable()
export class ArrangeSubscriptionUseCase
  extends UseCase<IArrangeSubscriptionPayload, SubscriptionActionDto>
  implements IArrangeSubscriptionUseCase
{
  constructor(
    @Inject(BillingDiToken.SUBSCRIPTION_PLANS_PROVIDER_SERVICE)
    private readonly subscriptionPlanService: ISubscriptionPlanService,
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
    @Inject(BaseToken.DB_CONTEXT) private readonly dbContext: IDbContext,
  ) {
    super();
  }

  public async implementation(): Promise<SubscriptionActionDto> {
    const { userId, arrangeSubscriptionDto } = this._input;

    const paymentCustomer = await this.dbContext.paymentCustomerRepository.findByUserId(userId);
    if (!paymentCustomer) {
      throw new CustomerForUserDoesNotExistException(userId);
    }

    if (!paymentCustomer.canSubscribe) throw new CustomerAlreadyHasSubscriptionException();

    const paymentPlanOptionsBuilder = PaymentPlanOptions.builder();

    if (!paymentCustomer.canUseTrial && arrangeSubscriptionDto.useTrial) {
      throw new CustomerAlreadyHasSubscriptionException();
    }

    if (arrangeSubscriptionDto.useTrial) {
      paymentPlanOptionsBuilder.trialOptions(new TrialOptions(this.appConfig.get('DD_TRIAL_PERIOD_DURATION_DAYS')));
    }

    const subscriptionAction = await this.subscriptionPlanService.createPlanPayment(
      paymentCustomer.providerCustomerId,
      arrangeSubscriptionDto.planId,
      paymentPlanOptionsBuilder.build(),
    );

    return subscriptionAction;
  }
}
