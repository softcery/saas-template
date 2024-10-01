import { FC } from 'react'

import { Button, Title, Text, InfoMessage } from '~/shared/ui/atoms'
import { Icon } from '~/shared/assets'

import styles from './styles.module.css'
import { useOpenBilling, useViewerSelectors } from '../../lib'

interface Props {
  total: number
  sent: number
}

export const EmailUsageInfo: FC<Props> = ({ total, sent }) => {
  const planBalance = useViewerSelectors.planBalance()

  const openCustomDomainSettings = useOpenBilling()

  // TODO add displaying logic
  return null

  return (
    <InfoMessage
      leftContent={
        <>
          <Text p="0 4px" c="white" size="sm" className={styles.count}>
            {sent}/{total}
          </Text>
          <Title order={6} c="white">
            emails per month sent
          </Title>
        </>
      }
      rightContent={
        <Button
          leftSection={<Icon name="sparkle" width={18} height={18} />}
          variant="white"
          size="sm"
          onClick={openCustomDomainSettings}
          classNames={{
            section: styles.buttonSection,
          }}
        >
          Upgrade
        </Button>
      }
    />
  )
}
