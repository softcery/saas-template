import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'

import { authApi, viewer } from '~/entities/viewer'
import { cancelSubscriptionApi } from '~/features/billing/cancel-subscription'
import { getProductsApi } from '~/features/billing/get-products'
import { openPaymentApi } from '~/features/billing/open-payment'
import { upgradeSubscriptionApi } from '~/features/billing/upgrade-subscription'
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
    [getProductsApi.reducerPath]: getProductsApi.reducer,
    [cancelSubscriptionApi.reducerPath]: cancelSubscriptionApi.reducer,
    [openPaymentApi.reducerPath]: openPaymentApi.reducer,
    [upgradeSubscriptionApi.reducerPath]: upgradeSubscriptionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(getProductsApi.middleware)
      .concat(openPaymentApi.middleware)
      .concat(cancelSubscriptionApi.middleware)
      .concat(upgradeSubscriptionApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
