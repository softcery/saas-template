import { Customer } from '../stripe/models/customer.model';

export class PaymentCustomerEvent {
  constructor(public customer: Customer) {}
}
