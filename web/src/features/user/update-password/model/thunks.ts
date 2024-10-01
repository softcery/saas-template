import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiService, modifyError } from '~/shared/api'
import { ThunkPayload } from '~/shared/lib/redux'

import { UpdateUserPasswordPayload } from '../types'

export const updatePassword = createAsyncThunk<
  void,
  ThunkPayload<UpdateUserPasswordPayload>,
  { rejectValue: string }
>('updateUserPassword/initiate', async ({ data }, { rejectWithValue }) => {
  try {
    await apiService().users.updatePassword({ requestBody: data })
  } catch (res) {
    return rejectWithValue(modifyError(res).message)
  }
})
