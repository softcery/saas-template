import { Button } from '~/shared/ui/atoms/button'
import { useCancelSubscription } from '../lib'

export const CancelSubscriptionButton = () => {
  const [cancelSubscription, { isLoading }] = useCancelSubscription()

  return (
    <Button disabled={isLoading} onClick={() => cancelSubscription()}>
      Cancel
    </Button>
  )
}
