import { billingApi } from '~/entities/billing'
import { SubscriptionAction } from '~/entities/billing/types'
import { apiService } from '~/shared/api'

export const extendedApi = billingApi.injectEndpoints({
  endpoints: (build) => ({
    upgradeSubscription: build.mutation<SubscriptionAction, void>({
      queryFn: async () => {
        try {
          const data = await apiService().billing.upgradeSubscription()
          return { data }
        } catch (error) {
          if (error instanceof Error) {
            return { error: { message: error.message } }
          } else {
            return { error: { message: 'Unknown error' } }
          }
        }
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        const {
          data: { paymentLink },
        } = await queryFulfilled
        window.location.replace(paymentLink)
      },
    }),
  }),
})
