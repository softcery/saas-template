import { PlanQuota } from '../../domain/value-objects/plan-quota.value';
import { Customer } from '../models/customer.model';
import { PaymentCustomerEvent } from './payment-customer.event';

export class PlanQuotaRenewedEvent extends PaymentCustomerEvent {
  constructor(
    public quota: PlanQuota,
    customer: Customer,
  ) {
    super(customer);
  }
}
