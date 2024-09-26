import { Customer } from '../../infrastructure/stripe/models/customer.model';

export interface IPaymentCustomerCreationOptions {
  name: string;
  email: string;
}

export interface IPaymentCustomerService {
  createCustomer(customerOptions: IPaymentCustomerCreationOptions): Promise<Customer>;
  // getCustomerByUserId(userId: string): Promise<PaymentCustomer>;
  getById(id: string): Promise<Customer>;
  // saveCustomer(customer: PaymentCustomer): Promise<PaymentCustomer>;
}
