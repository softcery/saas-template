import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import {
  IPaymentCustomerCreationOptions,
  IPaymentCustomerService,
} from '../../../../application/services/payment-customer-service.interface';
import { BillingDiToken } from '../../constants';
import { StripeCustomerMapper } from '../../mappers/stripe-customer/stripe-customer.mapper';
import { Customer } from '../../models/customer.model';
import { StripeClientService } from '../stripe-client-service/stripe-client.service';

@Injectable()
export class StripeCustomerService implements IPaymentCustomerService {
  constructor(
    private readonly stripeService: StripeClientService,
    @Inject(BillingDiToken.SUBSCRIPTION_PLANS_PROVIDER_SERVICE)
    private readonly stripeCustomerMapper: StripeCustomerMapper,
  ) {}

  public async createCustomer(customerOptions: IPaymentCustomerCreationOptions): Promise<Customer> {
    const customer = await this.stripeService.stripe.customers.create({
      name: customerOptions.name,
      email: customerOptions.email,
    });

    return this.stripeCustomerMapper.toDomain(customer);
  }

  // public async getCustomerByUserId(userId: string): Promise<PaymentCustomer> {
  //   const result = await this.paymentCustomerRepository.findByUserId(userId);
  //   return result;
  // }

  public async getById(id: string): Promise<Customer> {
    const customer = await this.stripeService.stripe.customers.retrieve(id);
    if (customer.deleted) {
      throw new Error('Customer deleted error'); // TODO - replace with custom exception
    }
    return this.stripeCustomerMapper.toDomain(customer as Stripe.Customer);
  }

  // public async saveCustomer(customer: PaymentCustomer): Promise<PaymentCustomer> {
  //   const currentCustomer = await this.getById(customer.id);
  //   if (currentCustomer.planStartedAt !== customer.planStartedAt) {
  //     await this.renewPlanQuota(customer);
  //   }
  //   const result = await this.paymentCustomerRepository.save(customer);
  //   return result;
  // }

  // private async renewPlanQuota(customer: PaymentCustomer) {
  //   const plan = await this.subscriptionPlanService.getPlanById(customer.subscription.plan.id);
  //   this.eventEmitter.emit(AppEvents.PLAN_QUOTA_RENEWED, new PlanQuotaRenewedEvent(plan.quota, customer));
  // }
}
