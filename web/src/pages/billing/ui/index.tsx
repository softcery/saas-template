import { useGetProductsWithCustomerPermissions } from '~/features/billing/get-products'
import { ProductsList } from './products-list'

export const BillingPage = () => {
  const { data, isLoading, isError } = useGetProductsWithCustomerPermissions()

  if (isLoading) return <p>Loading products....</p>
  if (isError) return <p>Error occurred</p>

  return <ProductsList products={data!} />
}
