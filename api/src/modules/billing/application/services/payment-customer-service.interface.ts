import { Customer } from '../../infrastructure/models/customer.model';

export interface IPaymentCustomerCreationOptions {
  name?: string;
  email?: string;
}

export interface IPaymentCustomerService {
  createCustomer(customerOptions: IPaymentCustomerCreationOptions): Promise<Customer>;
  getById(id: string): Promise<Customer>;
}
