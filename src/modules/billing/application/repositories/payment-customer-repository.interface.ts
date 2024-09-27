import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';

export interface IPaymentCustomerRepository {
  findByUserId(id: string): Promise<PaymentCustomer>;
  findByProviderId(id: string): Promise<PaymentCustomer>;
  save(entity: PaymentCustomer): Promise<PaymentCustomer>;
}
