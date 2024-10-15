import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';
import { Subscription } from '~modules/billing/infrastructure/models/subscription.model';
import { IUseCase } from '~shared/application/use-cases/use-case.interface';

export interface IUpdatePaymentCustomerSubscriptionPayload {
  customerProviderId: string;
  subscription: Subscription;
}

export interface IUpdateCustomerSubscriptionUseCase
  extends IUseCase<IUpdatePaymentCustomerSubscriptionPayload, PaymentCustomer> {}
