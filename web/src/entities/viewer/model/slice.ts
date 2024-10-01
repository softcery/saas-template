import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { ViewerLocalStorageKeys } from '~/entities/viewer'

import { Session, TokensResult, ViewerInitialState } from '../types'

const initialState: ViewerInitialState = {
  session: undefined,
  accessToken: undefined,
  refreshToken: undefined,
}

export function parseAccessToken(token: string): Session {
  return JSON.parse(atob(token.split('.')[1]))
}

export const slice = createSlice({
  name: 'viewer',
  initialState: getViewerInitialState,
  reducers: {
    updateSession(state, { payload: session }: PayloadAction<Session>) {
      state.session = session
    },

    setTokens(state, { payload: tokens }: PayloadAction<Partial<TokensResult>>) {
      const { accessToken, refreshToken } = tokens
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      const hasSession = accessToken && refreshToken
      state.session = hasSession ? parseAccessToken(accessToken) : undefined
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
    session: hasSession ? parseAccessToken(accessToken) : undefined,
    accessToken,
    refreshToken,
  }
}

export const { reset, setTokens, updateSession } = slice.actions
