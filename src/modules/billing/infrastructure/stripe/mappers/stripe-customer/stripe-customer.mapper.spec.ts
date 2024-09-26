import { Test, TestingModule } from '@nestjs/testing';
import Stripe from 'stripe';

import { StripeSubscriptionMapper } from '../stripe-subscription/stripe-subscription.mapper';
import { StripeCustomerMapper } from './stripe-customer.mapper';

describe('StripeCustomerMapper', () => {
  let stripeCustomerMapper: StripeCustomerMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeCustomerMapper, StripeSubscriptionMapper],
    }).compile();

    stripeCustomerMapper = module.get<StripeCustomerMapper>(StripeCustomerMapper);
  });

  it('should map metadata correctly', () => {
    const trialCancelationDate = new Date();

    const stripeCustomer: Stripe.Customer = {
      id: 'cus_123',
      email: 'customer@example.com',
      name: 'John Doe',
      metadata: {
        trialCanceledAt: trialCancelationDate.toISOString(),
        hadTrial: 'true',
      },
    } as any;

    const paymentCustomer = stripeCustomerMapper.toDomain(stripeCustomer);

    expect(paymentCustomer.hadTrial).toEqual(true);
    expect(paymentCustomer.trialCanceledAt).toEqual(trialCancelationDate);
  });
});
