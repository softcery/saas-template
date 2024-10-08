import React, { FC } from 'react'
import { Button } from '~/shared/ui/atoms/button'
import { useUpgradeSubscription } from '../lib'

export const UpgradeSubscriptionButton: FC = () => {
  const [upgradeSubscription, { isLoading }] = useUpgradeSubscription()

  return (
    <Button disabled={isLoading} onClick={() => upgradeSubscription()}>
      Upgrade
    </Button>
  )
}
