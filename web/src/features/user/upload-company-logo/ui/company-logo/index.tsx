import { AvatarProps } from '@mantine/core'
import { FC } from 'react'

import { useViewerSelectors } from '~/entities/viewer'
import { Icon } from '~/shared/assets'
import { LoaderIcon } from '~/shared/assets/icon/icons'
import { Avatar } from '~/shared/ui/atoms'

interface Props extends Omit<AvatarProps, 'src'> {}

export const CompanyLogo: FC<Props> = ({ ...props }) => {
  const user = useViewerSelectors.user()

  return (
    <Avatar w={64} h={64} src={user?.companyLogoPublicUrl} {...props}>
      {user ? <Icon width={32} height={32} name="avatarPlaceholder" /> : <LoaderIcon />}
    </Avatar>
  )
}
