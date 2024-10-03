import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { createErrorToast, createSuccessToast } from '../lib'
import {
  IdentifiableToast,
  Toast,
  ToastId,
  ToastNotificationsInitialState,
} from '../types'
import { signInWithEmailPasswordApi } from '~/features/auth/sign-in-with-email-password'
const initialState: ToastNotificationsInitialState = {
  toasts: [],
}

export const slice = createSlice({
  name: 'toastsNotifications',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      const newToast: IdentifiableToast = { ...action.payload, id: crypto.randomUUID() }
      state.toasts.push(newToast)
    },
    removeToast: (state, action) => {
      const closedToastId: ToastId = action.payload
      state.toasts = state.toasts.filter((toast) => toast.id !== closedToastId)
    },
    addSuccessToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(createSuccessToast(action.payload))
    },
    addErrorToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(createErrorToast(action.payload))
    },
    resetToasts: (state) => {
      state.toasts = initialState.toasts
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        signInWithEmailPasswordApi.endpoints.signInWithEmailPassword.matchFulfilled,
        (state) => {
          state.toasts.push(
            createSuccessToast({
              title: 'Sign in Successful',
              description: 'You have successfully signed in!',
            }),
          )
        },
      )
      .addMatcher(
        signInWithEmailPasswordApi.endpoints.signInWithEmailPassword.matchRejected,
        (state) => {
          state.toasts.push(
            createErrorToast({
              title: 'Sign in Failed',
              description: 'Unable to sign in. Please check your credentials.',
            }),
          )
        },
      )
  },
})

export const { addToast, removeToast, addSuccessToast, addErrorToast, resetToasts } =
  slice.actions
