import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { PlanBalance, UserSubscription, ViewerLocalStorageKeys } from '~/entities/viewer'

import { Session, User, ViewerInitialState } from '../types'

const initialState: ViewerInitialState = {
  session: undefined,
  user: undefined,
  planBalance: undefined,
  userSubscription: undefined,
}

export const slice = createSlice({
  name: 'viewer',
  initialState: getViewerInitialState,
  reducers: {
    updateViewer(state, { payload: user }: PayloadAction<User>) {
      state.user = user
    },
    updateUserSubscription(state, { payload }: PayloadAction<UserSubscription>) {
      state.userSubscription = payload
    },
    updatePlanBalance(state, { payload }: PayloadAction<PlanBalance>) {
      state.planBalance = payload
    },
    updateSession(state, { payload: session }: PayloadAction<Session>) {
      state.session = session
    },

    reset() {
      return initialState
    },
  },
})

function getViewerInitialState(): ViewerInitialState {
  const accessToken = localStorage.getItem(ViewerLocalStorageKeys.ACCESS_TOKEN)
  const refreshToken = localStorage.getItem(ViewerLocalStorageKeys.REFRESH_TOKEN)
  const hasSession = accessToken && refreshToken
  return {
    ...initialState,
    session: hasSession ? { accessToken, refreshToken } : undefined,
  }
}

export const {
  updateViewer,
  reset,
  updateSession,
  updateUserSubscription,
  updatePlanBalance,
} = slice.actions
