import { SubscriptionPlanDto as SubscriptionPlan } from '@softcery/sass-template-apiclient'
export type { SubscriptionPlanDto as SubscriptionPlan } from '@softcery/sass-template-apiclient'

export interface SubscriptionPlanWithPermissions extends SubscriptionPlan {
  canSubscribe: boolean
  canCancel: boolean
  canUpgrade: boolean
}
