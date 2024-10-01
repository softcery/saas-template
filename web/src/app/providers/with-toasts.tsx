import React, { Fragment } from 'react'

import { ToastNotifications } from '~/widgets/toast-notifications'

export const withToasts = (Component: React.ComponentType) => () => {
  return (
    <Fragment>
      <Component />

      <ToastNotifications />
    </Fragment>
  )
}
