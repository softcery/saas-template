import { billingApi } from '~/entities/billing'
import { ArrangeSubscriptionCommand, SubscriptionAction } from '~/entities/billing/types'
import { apiService } from '~/shared/api'

export const extendedApi = billingApi.injectEndpoints({
  endpoints: (build) => ({
    openPayment: build.mutation<SubscriptionAction, ArrangeSubscriptionCommand>({
      queryFn: async (arrangeSubscriptionCommand) => {
        try {
          const data = await apiService().billing.arrangeSubscription({
            requestBody: arrangeSubscriptionCommand,
          })

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
