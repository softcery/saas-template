import { Customer } from '../models/customer.model';

export class PaymentCustomerEvent {
  constructor(public customer: Customer) {}
}
