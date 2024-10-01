import { FC } from 'react'

import { Flex, Text, Group } from '~/shared/ui/atoms'

import { UploadCompanyLogoButton } from './upload-button'
import { CompanyLogo } from './company-logo'

interface Props {
  label?: string
  extendStyles?: {
    wrapper?: string
  }
}

export const UploadCompanyLogo: FC<Props> = ({ label, extendStyles }) => {
  return (
    <Group className={extendStyles?.wrapper}>
      {label && <Text fw={500}>{label}</Text>}
      <Flex gap={16}>
        <CompanyLogo />
        <Flex justify="space-between" direction="column">
          <Text c="gray.8" lh="lg" fz="xs">
            Upload the company logo so that you could use it in your physical letters
          </Text>
          <UploadCompanyLogoButton />
        </Flex>
      </Flex>
    </Group>
  )
}
