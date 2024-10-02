import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { ISubscriptionPlanService } from '../../../../application/services/subscription-plan-service.interface';
import { PlanNotFoundException } from '../../../exceptions/plan-not-found.exception';
import { TrialNotAllowedOnPlanException } from '../../../exceptions/trail-not-allowed-on-plan.exception';
import { StripePriceMapper } from '../../mappers/stripe-price/stripe-price.mapper';
import { StripeProductMapper } from '../../mappers/stripe-product/stripe-product.mapper';
import { PaymentActionModel } from '../../models/payment-action.model';
import { PaymentPlanOptions } from '../../models/payment-plan-options.model';
import { SubscriptionPlan } from '../../models/subscription-plan.model';
import { StripeClientService } from '../stripe-client-service/stripe-client.service';

@Injectable()
export class StripeSubscriptionPlanService implements ISubscriptionPlanService {
  constructor(
    private readonly stripeService: StripeClientService,
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
    private readonly stripeProductMapper: StripeProductMapper,
    private readonly stripePriceMapper: StripePriceMapper,
  ) {}

  public async listPlans(): Promise<SubscriptionPlan[]> {
    const { data: activeProducts } = await this.stripeService.stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });
    const subscriptionPlans = activeProducts
      .filter((product) => product.metadata.type === 'plan')
      .map((product) => {
        const price = product.default_price as Stripe.Price;

        return new SubscriptionPlan(this.stripeProductMapper.toModel(product), this.stripePriceMapper.toModel(price));
      });
    return subscriptionPlans;
  }

  public async getPlanById(id: string): Promise<SubscriptionPlan> {
    try {
      const product = await this.stripeService.stripe.products.retrieve(id, { expand: ['default_price'] });
      if (product.metadata.type !== 'plan') throw new PlanNotFoundException(id);
      const price = product.default_price as Stripe.Price;
      return new SubscriptionPlan(this.stripeProductMapper.toModel(product), this.stripePriceMapper.toModel(price));
    } catch (error) {
      if (error instanceof Stripe.errors.StripeError && error.statusCode === 404) {
        throw new PlanNotFoundException(id);
      }
      throw error;
    }
  }

  public async createPlanPayment(
    customerId: string,
    planId: string,
    options: PaymentPlanOptions = new PaymentPlanOptions(),
  ): Promise<PaymentActionModel> {
    const plan = await this.getPlanById(planId);
    if (options.trialOptions && !plan.product.isTrialAllowed)
      throw new TrialNotAllowedOnPlanException(plan.product.name);
    const session = await this.stripeService.stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: plan.price.providerId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: options.trialOptions
        ? {
            trial_period_days: options.trialOptions.daysDuration,
          }
        : undefined,
      success_url: this.appConfig.get('BILLING_SUCCESS_REDIRECT_URL'),
    });

    return new PaymentActionModel(session.url);
  }

  public async createUpdatePlanPaymentAction(customerId: string, subscriptionId: string): Promise<PaymentActionModel> {
    const session = await this.stripeService.stripe.billingPortal.sessions.create({
      customer: customerId,
      flow_data: {
        type: 'subscription_update',
        subscription_update: {
          subscription: subscriptionId,
        },
      },
      return_url: this.appConfig.get('BILLING_SUCCESS_REDIRECT_URL'),
    });

    return new PaymentActionModel(session.url);
  }

  public async createCancelPlanAction(customerId: string, subscriptionId: string): Promise<PaymentActionModel> {
    const session = await this.stripeService.stripe.billingPortal.sessions.create({
      customer: customerId,
      flow_data: {
        type: 'subscription_cancel',
        subscription_cancel: {
          subscription: subscriptionId,
        },
      },
      return_url: this.appConfig.get('BILLING_SUCCESS_REDIRECT_URL'),
    });

    return new PaymentActionModel(session.url);
  }
}
