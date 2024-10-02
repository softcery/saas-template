import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'

import { viewerSlice } from '~/entities/viewer'
import { sendPasswordResetConfirmationApi } from '~/features/auth/send-password-reset-confirmation'
import { signInWithEmailPasswordApi } from '~/features/auth/sign-in-with-email-password'
import { signUpWithEmailPasswordApi } from '~/features/auth/sign-up-with-email-password'
import { changeEmailApi } from '~/features/auth/update-email'
import { updatePasswordApi } from '~/features/auth/update-password'

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
    [changeEmailApi.reducerPath]: signInWithEmailPasswordApi.reducer,
    [updatePasswordApi.reducerPath]: updatePasswordApi.reducer,
    [sendPasswordResetConfirmationApi.reducerPath]: changeEmailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signInWithEmailPasswordApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
