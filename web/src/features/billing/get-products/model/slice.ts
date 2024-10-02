import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiService } from '~/shared/api'
import { SubscriptionPlan } from '../types'

export const getProductsApi = createApi({
  reducerPath: 'getProducts',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['products'],
  endpoints: (build) => ({
    getProducts: build.query<SubscriptionPlan[], void>({
      queryFn: async () => {
        try {
          const data = await apiService().billing.listSubscriptionPlans()

          return { data: data.list }
        } catch (error) {
          if (error instanceof Error) {
            return { error: { message: error.message } }
          } else {
            return { error: { message: 'Unknown error' } }
          }
        }
      },
      providesTags: ['products'],
    }),
  }),
})
