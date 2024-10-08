import { billingApi } from '~/entities/billing'
import { apiService } from '~/shared/api'
import { SubscriptionPlan, SubscriptionPlanWithPermissions } from '../types'
import { getSubscriptionPlanWithPermissions } from '~/entities/billing'

export const extendedApi = billingApi.injectEndpoints({
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
    getProductsWithCustomerPermissions: build.query<
      SubscriptionPlanWithPermissions[],
      void
    >({
      queryFn: async () => {
        try {
          const [productsResult, paymentCustomer] = await Promise.all([
            apiService().billing.listSubscriptionPlans(),
            apiService().billing.getPaymentCustomer(),
          ])

          const productsWithPermissions = productsResult.list.map((product) =>
            getSubscriptionPlanWithPermissions(product, paymentCustomer),
          )

          return { data: productsWithPermissions }
        } catch (error) {
          console.log(error)

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
