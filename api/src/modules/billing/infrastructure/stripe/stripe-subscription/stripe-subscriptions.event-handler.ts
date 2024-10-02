// import { Inject, Injectable } from '@nestjs/common';
// import { OnEvent } from '@nestjs/event-emitter';
// import Stripe from 'stripe';

// import { PAYMENT_CUSTOMER_SERVICE } from '~modules/billing/constants';
// import { IPaymentCustomerService } from '~modules/billing/infrastructure/stripe/services/payment-customer/payment-customer-service.interface';

// import { ISubscriptionDetails } from '../models/customer.model';
// import { SubscriptionState } from '../models/subscription-state.enum';

// @Injectable()
// export class StripeSubscriptionsEventHandler {
//   constructor(@Inject(PAYMENT_CUSTOMER_SERVICE) private readonly paymentCustomerService: IPaymentCustomerService) {}

//   @OnEvent('customer.subscription.created')
//   public async handleSubscriptionCreated(event: Stripe.CustomerSubscriptionCreatedEvent) {
//     const subscription = event.data.object;
//     const paymentCustomer = await this.paymentCustomerService.getById(subscription.customer as string);
//     paymentCustomer.updateSubscriptionDetails(this.stripeSubscriptionToSubscriptionDetails(subscription));

//     await this.paymentCustomerService.saveCustomer(paymentCustomer);
//   }
//   @OnEvent('customer.subscription.deleted')
//   public async handleCustomerSubscriptionDeleted(event: Stripe.CustomerSubscriptionDeletedEvent) {
//     const subscription = event.data.object;
//     const paymentCustomer = await this.paymentCustomerService.getById(subscription.customer as string);
//     paymentCustomer.updateSubscriptionDetails(this.stripeSubscriptionToSubscriptionDetails(subscription));

//     await this.paymentCustomerService.saveCustomer(paymentCustomer);
//   }

//   @OnEvent('customer.subscription.updated')
//   public async handleSubscriptionUpdate(event: Stripe.CustomerSubscriptionUpdatedEvent) {
//     const subscription = event.data.object;
//     const paymentCustomer = await this.paymentCustomerService.getById(subscription.customer as string);
//     paymentCustomer.updateSubscriptionDetails(this.stripeSubscriptionToSubscriptionDetails(subscription));

//     await this.paymentCustomerService.saveCustomer(paymentCustomer);
//   }

//   private stripeSubscriptionToSubscriptionDetails(stripeSubscription: Stripe.Subscription): ISubscriptionDetails {
//     return {
//       subscriptionId: stripeSubscription.id,
//       state: this.stripeStatusToSubscriptionState(stripeSubscription.status),
//       cancelAt: this.dateFromStripeDate(stripeSubscription.cancel_at),
//       cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
//       canceledAt: this.dateFromStripeDate(stripeSubscription.canceled_at),
//       periodStart: this.dateFromStripeDate(stripeSubscription.current_period_start),
//       periodEnd: this.dateFromStripeDate(stripeSubscription.current_period_end),
//       subscriptionPlanId: stripeSubscription.items.data.at(0).plan.product as string,
//     };
//   }

//   private stripeStatusSubscriptionStateRecord: Partial<Record<Stripe.Subscription.Status, SubscriptionState>> = {
//     active: SubscriptionState.ACTIVE,
//     trialing: SubscriptionState.TRIALING,
//     canceled: SubscriptionState.INACTIVE,
//   };

//   private stripeStatusToSubscriptionState(state: Stripe.Subscription.Status): SubscriptionState {
//     const subscriptionState = this.stripeStatusSubscriptionStateRecord[state];
//     if (!subscriptionState) throw new Error(`Unsupported stripe state: ${state}`);
//     return subscriptionState;
//   }

//   private dateFromStripeDate(stipeDate: number | null): Date | null {
//     if (!stipeDate) return null;
//     return new Date(stipeDate * 1000);
//   }
// }
