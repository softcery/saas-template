import { createAsyncThunk } from '@reduxjs/toolkit'

import { resetAccessToken, resetRefreshToken } from '~/shared/api'

import { reset } from './slice'
import { ViewerLocalStorageKeys } from '../config'

export const resetModel = createAsyncThunk<void, void>(
  'viewer/reset',
  async (_, { dispatch }) => {
    localStorage.removeItem(ViewerLocalStorageKeys.ACCESS_TOKEN)
    localStorage.removeItem(ViewerLocalStorageKeys.REFRESH_TOKEN)

    dispatch(reset())

    resetAccessToken()
    resetRefreshToken()
  },
)
