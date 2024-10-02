import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiService } from '~/shared/api'
import { SubscriptionAction } from '../types'

export const cancelSubscriptionApi = createApi({
  reducerPath: 'cancelSubscription',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    cancelSubscription: build.mutation<SubscriptionAction, void>({
      queryFn: async () => {
        try {
          const data = await apiService().billing.cancelSubscription()

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
