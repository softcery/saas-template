import React, { FC } from 'react'

import { Button, Text, Flex, Logo } from '~/shared/ui/atoms'

import styles from './styles.module.css'
import { Space } from '@mantine/core'

interface Props {
  children: React.ReactNode
  title: string
  withLogo?: boolean
  description?: string
  titleAlign?: React.CSSProperties['textAlign']
  footer?: {
    text: string
    buttonText: string
    onClick: () => void
  }
}
export const AuthFormWrapper: FC<Props> = ({
  children,
  titleAlign = 'center',
  title,
  description,
  withLogo,
  footer,
}) => (
  <div className={styles.formWrapper}>
    <div>
      {withLogo && (
        <>
          <Logo size="medium" />
          <Space h={40} />
        </>
      )}
      <Text fw={400} fz={24} lh="lg" ta={titleAlign} c="dark.9">
        {title}
      </Text>
      <Text mt={16} mih={48} c="dark.4" fw={400} fz="md">
        {description}
      </Text>

      {children}

      {footer && (
        <Flex mt={24} justify="center" align="center">
          <Text fw={500} size="sm" c="dark.6">
            {footer.text}
          </Text>

          <Button
            p="1px 0"
            w={62}
            h={26}
            size="sm"
            variant="transparent"
            onClick={footer.onClick}
          >
            {footer.buttonText}
          </Button>
        </Flex>
      )}
    </div>
  </div>
)
