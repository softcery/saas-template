import React, { Fragment } from 'react'

export const withToasts = (Component: React.ComponentType) => () => {
  return (
    <Fragment>
      <Component />
    </Fragment>
  )
}
