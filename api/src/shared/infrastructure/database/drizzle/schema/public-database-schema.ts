import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { SubscriptionStatus } from '~modules/billing/infrastructure/stripe/models/subscription.model';

export const paymentCustomer = pgTable('payment_customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  providerCustomerId: text('provider_customer_id').notNull(),
  userId: text('user_id').notNull(),
  name: text('name'),
  email: text('email'),
  trialStartedAt: timestamp('trial_started_at'),
  trialCanceledAt: timestamp('trial_canceled_at'),
  subscriptionCanceledAt: timestamp('subscription_canceled_at'),
  customerPlanId: uuid('customer_plan_id')
    .references(() => paymentCustomerPlan.id)
    .unique(),
});

export const paymentCustomerPlan = pgTable('payment_customer_plan', {
  id: uuid('id').primaryKey().defaultRandom(),
  productProviderId: text('product_provider_id'),
  subscriptionProviderId: text('subscription_provider_id'),
  planStartedAt: timestamp('plan_started_at'),
  planEndsAt: timestamp('plan_ends_at'),
  trialEndsAt: timestamp('trial_ends_at'),
  subscriptionStatus: text('subscription_status').$type<SubscriptionStatus>(),
});

export const paymentCustomerRelations = relations(paymentCustomer, ({ one }) => ({
  customerPlan: one(paymentCustomerPlan, {
    fields: [paymentCustomer.customerPlanId],
    references: [paymentCustomerPlan.id],
  }),
}));

export const paymentCustomerPlanRelations = relations(paymentCustomerPlan, ({ one }) => ({
  customer: one(paymentCustomer, {
    fields: [paymentCustomerPlan.id],
    references: [paymentCustomer.customerPlanId],
  }),
}));
