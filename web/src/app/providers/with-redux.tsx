import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'

import { viewerSlice } from '~/entities/viewer'

export const withRedux = (Component: React.ComponentType) => () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  )
}

const store = configureStore({
  reducer: {
    viewer: viewerSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
