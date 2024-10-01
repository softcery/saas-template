import type {
  UserResponseWithSubscriptionDto as UserResponseWithSubscription,
  UserSubscriptionDetailsDto as UserSubscription,
  PlanBalanceDto as PlanBalance,
} from '@softcery/detectdata-apiclient'

export interface User
  extends Omit<UserResponseWithSubscription, 'userSubscription' | 'planBalance'> {}

export type { AccessWithRefreshTokenResponseDto as AccessWithRefreshTokenResponse } from '@softcery/detectdata-apiclient'

export interface ViewerInitialState {
  user?: User
  session?: Session
  userSubscription?: UserSubscription
  planBalance?: PlanBalance
}

export interface Session {
  accessToken: string
  refreshToken: string
}

export { UserSubscription }
