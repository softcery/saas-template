import React, { FC } from 'react'

import { Avatar } from '~/shared/ui/atoms/avatar'
import { Skeleton } from '~/shared/ui/atoms'
import { getInitials } from '~/shared/lib/string'

import styles from './styles.module.css'
import { User } from '../../types'

interface Props {
  isLoading?: boolean
  user?: User
  extendStyles?: {
    root?: string
  }
}

export const UserAvatar: FC<Props> = ({ isLoading, extendStyles, user }) => {
  if (isLoading) return <Skeleton width={32} height={32} radius="100%" />

  if (!user) return null

  const initials = getInitials(`${user.firstName} ${user.lastName}`)

  return (
    <Avatar classNames={{ placeholder: styles.avatar, root: extendStyles?.root }}>
      {initials}
    </Avatar>
  )
}
