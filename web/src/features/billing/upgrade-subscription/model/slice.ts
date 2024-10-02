import { apiService } from '~/shared/api'
import { SubscriptionAction } from '../types'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const upgradeSubscriptionApi = createApi({
  reducerPath: 'upgradeSubscription',
  baseQuery: fakeBaseQuery(),
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
