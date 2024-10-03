import { SubscriptionPlanDto as SubscriptionPlan } from '@shared/api-client'
export type { SubscriptionPlanDto as SubscriptionPlan } from '@shared/api-client'

export interface SubscriptionPlanWithPermissions extends SubscriptionPlan {
  canSubscribe: boolean
  canCancel: boolean
  canUpgrade: boolean
}
