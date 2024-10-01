import { FC } from 'react'
import { Title, Text, Button, List, Error } from '~/shared/ui/atoms'
import { Icon } from '~/shared/assets'
import styles from './styles.module.css'

interface EmailSentCardProps {
  title: string
  email: string
  description: string
  resendButtonText: string
  onResend: () => void
  isProcessing: boolean
  error: string | null
}

export const EmailSentCard: FC<EmailSentCardProps> = ({
  title,
  email,
  description,
  resendButtonText,
  onResend,
  isProcessing,
  error,
}) => (
  <div className={`${styles.wrapper} animate__animated animate__fadeIn`}>
    <div className={styles.content}>
      <div className={styles.logo}>
        <Icon
          name="letter"
          fill="#1B55F5"
          withGradient
          color="#D9E8FF"
          width={32}
          height={32}
        />
      </div>

      <Title c="dark.9" order={2} ta="center">
        {title}
      </Title>

      <Text c="dark.8" size="md" ta="center" m="32px 0 24px 0">
        {description}{' '}
        <Text fw={500} span size="md" c="blue.6">
          {email}
        </Text>
      </Text>

      <div className={styles.info}>
        <div>
          <Text fw={500} c="dark.4" size="sm">
            Don’t see the email in your Inbox?
          </Text>

          <List classNames={{ item: styles.listItem }} size="sm" c="dark.4">
            <List.Item>Please check your Promotions and Spam folders</List.Item>
            <List.Item>
              In some cases it may take up to 5 minutes for the email to arrive
            </List.Item>
          </List>
        </div>

        {error && <Error title={error} />}

        <Button
          variant="subtle-no-hover"
          className={styles.resendButton}
          onClick={onResend}
          loading={isProcessing}
        >
          {resendButtonText}
        </Button>
      </div>
    </div>
  </div>
)
