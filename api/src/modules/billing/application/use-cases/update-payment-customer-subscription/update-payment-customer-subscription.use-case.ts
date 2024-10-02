import { Inject, Injectable } from '@nestjs/common';

import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';
import { IDbContext } from '~shared/application/services/db-context.interface';
import { UseCase } from '~shared/application/use-cases/use-case.interface';
import { BaseToken } from '~shared/constants';

import { CustomerNotFoundByProviderIdException } from '../../exceptions/customer-not-found-by-provider-id.exception';
import {
  IUpdateCustomerSubscriptionUseCase,
  IUpdatePaymentCustomerSubscriptionPayload,
} from './update-payment-customer-subscription-use-case.interface';

@Injectable()
export class UpdatePaymentCustomerSubscriptionUseCase
  extends UseCase<IUpdatePaymentCustomerSubscriptionPayload, PaymentCustomer>
  implements IUpdateCustomerSubscriptionUseCase
{
  constructor(@Inject(BaseToken.DB_CONTEXT) private readonly dbContext: IDbContext) {
    super();
  }

  protected async implementation(): Promise<PaymentCustomer> {
    const { customerProviderId, subscription } = this._input;

    const paymentCustomer = await this.dbContext.paymentCustomerRepository.findByProviderId(customerProviderId);
    if (!paymentCustomer) {
      throw new CustomerNotFoundByProviderIdException(customerProviderId);
    }

    paymentCustomer.updateSubscriptionDetails(subscription);

    return this.dbContext.paymentCustomerRepository.save(paymentCustomer);
  }
}
