import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';
import { Subscription } from '~modules/billing/infrastructure/stripe/models/subscription.model';
import { UseCase } from '~shared/application/use-case/use-case.interface';

export interface IUpdatePaymentCustomerSubscriptionPayload {
  customerProviderId: string;
  subscription: Subscription;
}

export interface IUpdateCustomerSubscriptionUseCase
  extends UseCase<IUpdatePaymentCustomerSubscriptionPayload, PaymentCustomer> {}
