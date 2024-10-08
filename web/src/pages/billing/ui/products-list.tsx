import { FC } from 'react'
import { SubscriptionPlanWithPermissions } from '~/features/billing/get-products/types'
import { ProductCard } from './product-card'

interface Props {
  products: SubscriptionPlanWithPermissions[]
}

export const ProductsList: FC<Props> = ({ products }) => {
  return (
    <ul className="list-none flex gap-4">
      {products
        .slice()
        .sort((a, b) => a.price - b.price)
        .map((product) => (
          <li key={product.productId}>
            <ProductCard product={product} />
          </li>
        ))}
    </ul>
  )
}
