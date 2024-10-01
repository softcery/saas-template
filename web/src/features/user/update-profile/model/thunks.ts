import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiService, modifyError } from '~/shared/api'
import { User, viewerSlice } from '~/entities/viewer'
import { ThunkPayload } from '~/shared/lib/redux'

import { UpdateUserProfilePayload } from '../types'

export const updateProfile = createAsyncThunk<
  User,
  ThunkPayload<UpdateUserProfilePayload>,
  { rejectValue: string }
>('updateUserProfile/initiate', async ({ data }, { rejectWithValue, dispatch }) => {
  try {
    const user = await apiService().users.updateProfile({ requestBody: data })

    dispatch(viewerSlice.updateViewer(user))

    return user
  } catch (res) {
    return rejectWithValue(modifyError(res).message)
  }
})
