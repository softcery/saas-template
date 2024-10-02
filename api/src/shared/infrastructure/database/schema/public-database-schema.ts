import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { SubscriptionStatus } from '~modules/billing/infrastructure/stripe/models/subscription.model';

export const paymentCustomer = pgTable('payment_customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  providerCustomerId: text('provider_customer_id').notNull(),
  userId: text('user_id').notNull(),
  name: text('name'),
  email: text('email'),
  subscriptionProviderId: text('subscription_provider_id'),
  trialStartedAt: timestamp('trial_started_at'),
  trialCanceledAt: timestamp('trial_canceled_at'),
  trialEndsAt: timestamp('trial_ends_at'),
  planStartedAt: timestamp('plan_started_at'),
  subscriptionCanceledAt: timestamp('subscription_canceled_at'),
  planEndsAt: timestamp('plan_ends_at'),
  subscriptionStatus: text('subscription_status').$type<SubscriptionStatus>(),
});
