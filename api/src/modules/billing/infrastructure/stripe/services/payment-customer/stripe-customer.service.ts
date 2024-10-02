import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import {
  IPaymentCustomerCreationOptions,
  IPaymentCustomerService,
} from '../../../../application/services/payment-customer-service.interface';
import { StripeCustomerMapper } from '../../mappers/stripe-customer/stripe-customer.mapper';
import { Customer } from '../../models/customer.model';
import { StripeClientService } from '../stripe-client-service/stripe-client.service';

@Injectable()
export class StripeCustomerService implements IPaymentCustomerService {
  constructor(
    private readonly stripeService: StripeClientService,
    private readonly stripeCustomerMapper: StripeCustomerMapper,
  ) {}

  public async createCustomer(customerOptions: IPaymentCustomerCreationOptions): Promise<Customer> {
    const customer = await this.stripeService.stripe.customers.create({
      name: customerOptions.name,
      email: customerOptions.email,
    });

    return this.stripeCustomerMapper.toDomain(customer);
  }

  public async getById(id: string): Promise<Customer> {
    const customer = await this.stripeService.stripe.customers.retrieve(id);
    if (customer.deleted) {
      throw new Error('Customer deleted error'); // TODO - replace with custom exception
    }
    return this.stripeCustomerMapper.toDomain(customer as Stripe.Customer);
  }
}
