import {
  SubscriptionPlan,
  SubscriptionPlanWithPermissions,
} from '~/features/billing/get-products/types'
import { PaymentCustomer } from '../types'

export const getSubscriptionPlanWithPermissions = (
  plan: SubscriptionPlan,
  customer: PaymentCustomer,
): SubscriptionPlanWithPermissions => {
  return {
    ...plan,
    canCancel: customer.subscriptionProductId === plan.productId,
    canUpgrade:
      !!customer.subscriptionProductId &&
      customer.subscriptionProductId !== plan.productId,
    canSubscribe: !customer.subscriptionProductId,
  }
}
