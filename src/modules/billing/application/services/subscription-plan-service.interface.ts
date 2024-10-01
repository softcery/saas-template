import { SubscriptionPlan } from '~modules/billing/infrastructure/stripe/models/subscription-plan.model';

import { PaymentActionModel } from '../../infrastructure/stripe/models/payment-action.model';
import { PaymentPlanOptions } from '../../infrastructure/stripe/models/payment-plan-options.model';

export interface ISubscriptionPlanService {
  listPlans(): Promise<SubscriptionPlan[]>;
  getPlanById(id: string): Promise<SubscriptionPlan>;
  createPlanPayment(customerId: string, planId: string, options?: PaymentPlanOptions): Promise<PaymentActionModel>;
  createUpdatePlanPaymentAction(customerId: string, subscriptionId: string): Promise<PaymentActionModel>;
  createCancelPlanAction(customerId: string, subscriptionId: string): Promise<PaymentActionModel>;
}
