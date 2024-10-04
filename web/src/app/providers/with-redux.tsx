import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'
import { billingApi } from '~/entities/billing'

import { authApi, viewer } from '~/entities/viewer'
import { toastNotificationsSlice } from '~/widgets/toast-notifications'

export const withRedux = (Component: React.ComponentType) => () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  )
}

const store = configureStore({
  reducer: {
    viewer: viewer.reducer,
    toastNotifications: toastNotificationsSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [billingApi.reducerPath]: billingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(billingApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
