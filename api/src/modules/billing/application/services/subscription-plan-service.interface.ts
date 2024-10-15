import { PaymentActionModel } from '../../infrastructure/models/payment-action.model';
import { PaymentPlanOptions } from '../../infrastructure/models/payment-plan-options.model';
import { SubscriptionPlan } from '../../infrastructure/models/subscription-plan.model';

export interface ISubscriptionPlanService {
  listPlans(): Promise<SubscriptionPlan[]>;
  getPlanById(id: string): Promise<SubscriptionPlan>;
  createPlanPayment(customerId: string, planId: string, options?: PaymentPlanOptions): Promise<PaymentActionModel>;
  createUpdatePlanPaymentAction(customerId: string, subscriptionId: string): Promise<PaymentActionModel>;
  createCancelPlanAction(customerId: string, subscriptionId: string): Promise<PaymentActionModel>;
}
