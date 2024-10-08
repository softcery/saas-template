import React, { FC } from 'react'
import { Button } from '~/shared/ui/atoms/button'
import { useOpenPayment } from '../lib'

export interface Props {
  planId: string
  useTrial?: boolean
}

export const OpenPaymentButton: FC<Props> = ({ planId, useTrial = false }) => {
  const [openPayment, { isLoading }] = useOpenPayment()

  return (
    <Button disabled={isLoading} onClick={() => openPayment({ planId, useTrial })}>
      Purchase
    </Button>
  )
}
