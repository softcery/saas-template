import { FC } from 'react'
import { CancelSubscriptionButton } from '~/features/billing/cancel-subscription'
import { SubscriptionPlanWithPermissions } from '~/features/billing/get-products/types'
import { OpenPaymentButton } from '~/features/billing/open-payment'
import { UpgradeSubscriptionButton } from '~/features/billing/upgrade-subscription'
import { Card } from '~/shared/ui/atoms/card'

interface Props {
  product: SubscriptionPlanWithPermissions
}

export const ProductCard: FC<Props> = ({
  product: {
    productId,
    name,
    price,
    features,
    currency,
    canCancel,
    canSubscribe,
    canUpgrade,
  },
}) => {
  return (
    <Card className="flex h-full min-w-80 flex-col gap-4 p-6">
      <h3 className="text-2xl">{name}</h3>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <span className="mt-auto text-xl">
        Price: {price} {currency}
      </span>

      {canSubscribe && <OpenPaymentButton planId={productId} />}

      {canCancel && <CancelSubscriptionButton />}

      {canUpgrade && <UpgradeSubscriptionButton />}
    </Card>
  )
}
