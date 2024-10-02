import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'

import { viewerSlice } from '~/entities/viewer'
import { sendPasswordResetConfirmationApi } from '~/features/auth/send-password-reset-confirmation'
import { signInWithEmailPasswordApi } from '~/features/auth/sign-in-with-email-password'
import { signUpWithEmailPasswordApi } from '~/features/auth/sign-up-with-email-password'
import { changeEmailApi } from '~/features/auth/update-email'
import { updatePasswordApi } from '~/features/auth/update-password'
import { cancelSubscriptionApi } from '~/features/billing/cancel-subscription'
import { getProductsApi } from '~/features/billing/get-products'
import { openPaymentApi } from '~/features/billing/open-payment'
import { upgradeSubscriptionApi } from '~/features/billing/upgrade-subscription'

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
    [signInWithEmailPasswordApi.reducerPath]: signInWithEmailPasswordApi.reducer,
    [signUpWithEmailPasswordApi.reducerPath]: signUpWithEmailPasswordApi.reducer,
    [changeEmailApi.reducerPath]: changeEmailApi.reducer,
    [updatePasswordApi.reducerPath]: updatePasswordApi.reducer,
    [sendPasswordResetConfirmationApi.reducerPath]:
      sendPasswordResetConfirmationApi.reducer,
    [getProductsApi.reducerPath]: getProductsApi.reducer,
    [cancelSubscriptionApi.reducerPath]: cancelSubscriptionApi.reducer,
    [openPaymentApi.reducerPath]: openPaymentApi.reducer,
    [upgradeSubscriptionApi.reducerPath]: upgradeSubscriptionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(signInWithEmailPasswordApi.middleware)
      .concat(signUpWithEmailPasswordApi.middleware)
      .concat(changeEmailApi.middleware)
      .concat(updatePasswordApi.middleware)
      .concat(sendPasswordResetConfirmationApi.middleware)
      .concat(getProductsApi.middleware)
      .concat(openPaymentApi.middleware)
      .concat(cancelSubscriptionApi.middleware)
      .concat(upgradeSubscriptionApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
