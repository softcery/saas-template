import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';
import { IBaseRepository } from '~shared/application/repositories/base-repository.interface';

export interface IPaymentCustomerRepository extends IBaseRepository<PaymentCustomer, string> {
  findByUserId(id: string): Promise<PaymentCustomer>;
  findByProviderId(id: string): Promise<PaymentCustomer>;
}
