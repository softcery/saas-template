import { Module } from '@nestjs/common';

import { ArrangeSubscriptionUseCase } from './application/use-cases/arrange-subscription/arrange-subscription.use-case';
import { CancelSubscriptionUseCase } from './application/use-cases/cancel-subscription/cancel-subscription.use-case';
import { ListSubscriptionPlansUseCase } from './application/use-cases/list-subscription-plans/list-subscription-plans.use-case';
import { UpgradeSubscriptionUseCase } from './application/use-cases/upgrade-subscription/upgrade-subscription.use-case';
import { DrizzlePaymentCustomerMapper } from './infrastructure/persistence/drizzle/mappers/payment-customer/drizzle-payment-customer.mapper';
import { DrizzlePaymentCustomerRepository } from './infrastructure/persistence/drizzle/repositories/payment-customer/drizzle-payment-customer.repository';
import { BillingDiToken } from './infrastructure/stripe/constants';
import { StripeCustomerMapper } from './infrastructure/stripe/mappers/stripe-customer/stripe-customer.mapper';
import { StripePriceMapper } from './infrastructure/stripe/mappers/stripe-price/stripe-price.mapper';
import { StripeProductMapper } from './infrastructure/stripe/mappers/stripe-product/stripe-product.mapper';
import { StripeSubscriptionMapper } from './infrastructure/stripe/mappers/stripe-subscription/stripe-subscription.mapper';
import { StripeCustomerService } from './infrastructure/stripe/services/payment-customer/stripe-customer.service';
import { StripeClientService } from './infrastructure/stripe/services/stripe-client-service/stripe-client.service';
import { StripeSubscriptionPlanService } from './infrastructure/stripe/services/subscription-plan/stripe-subscription-plan.service';

@Module({
  providers: [
    StripeCustomerMapper,
    StripeSubscriptionMapper,
    StripeProductMapper,
    StripeClientService,
    StripePriceMapper,
    { provide: BillingDiToken.PAYMENT_CUSTOMER_REPOSITORY, useClass: DrizzlePaymentCustomerRepository },
    DrizzlePaymentCustomerMapper,
    { provide: BillingDiToken.CUSTOMER_PROVIDER_SERVICE, useClass: StripeCustomerService },
    { provide: BillingDiToken.SUBSCRIPTION_PLANS_PROVIDER_SERVICE, useClass: StripeSubscriptionPlanService },
    { provide: BillingDiToken.ARRANGE_SUBSCRIPTION_USE_CASE, useClass: ArrangeSubscriptionUseCase },
    { provide: BillingDiToken.UPGRADE_SUBSCRIPTION_USE_CASE, useClass: UpgradeSubscriptionUseCase },
    { provide: BillingDiToken.CANCEL_SUBSCRIPTION_USE_CASE, useClass: CancelSubscriptionUseCase },
    { provide: BillingDiToken.LIST_SUBSCRIPTION_PLANS_USE_CASE, useClass: ListSubscriptionPlansUseCase },
  ],
})
export class BillingModule {}
