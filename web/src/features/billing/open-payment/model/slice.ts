import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiService } from '~/shared/api'
import { ArrangeSubscriptionCommand, SubscriptionAction } from '../types'

export const openPaymentApi = createApi({
  reducerPath: 'openPayment',
  baseQuery: fakeBaseQuery(),
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
