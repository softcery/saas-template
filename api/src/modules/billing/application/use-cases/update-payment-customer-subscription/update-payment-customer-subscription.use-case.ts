import { Inject, Injectable } from '@nestjs/common';

import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';
import { BillingDiToken } from '~modules/billing/infrastructure/stripe/constants';
import { UseCase } from '~shared/application/use-case/use-case.interface';

import { CustomerNotFoundByProviderIdException } from '../../exceptions/customer-not-found-by-provider-id.exception';
import { IPaymentCustomerRepository } from '../../repositories/payment-customer-repository.interface';
import {
  IUpdateCustomerSubscriptionUseCase,
  IUpdatePaymentCustomerSubscriptionPayload,
} from './update-payment-customer-subscription-use-case.interface';

@Injectable()
export class UpdatePaymentCustomerSubscriptionUseCase
  extends UseCase<IUpdatePaymentCustomerSubscriptionPayload, PaymentCustomer>
  implements IUpdateCustomerSubscriptionUseCase
{
  constructor(
    @Inject(BillingDiToken.PAYMENT_CUSTOMER_REPOSITORY)
    private readonly paymentCustomerRepository: IPaymentCustomerRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<PaymentCustomer> {
    const { customerProviderId, subscription } = this._input;

    const paymentCustomer = await this.paymentCustomerRepository.findByProviderId(customerProviderId);
    if (!paymentCustomer) {
      throw new CustomerNotFoundByProviderIdException(customerProviderId);
    }

    paymentCustomer.updateSubscriptionDetails(subscription);

    return this.paymentCustomerRepository.save(paymentCustomer);
  }
}
