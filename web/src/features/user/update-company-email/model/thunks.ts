import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiService, modifyError } from '~/shared/api'
import { ThunkPayload } from '~/shared/lib/redux'

import { UpdateUserEmailPayload } from '../types'

export const updateEmail = createAsyncThunk<
  void,
  ThunkPayload<UpdateUserEmailPayload>,
  { rejectValue: string }
>('updateUserEmail/initiate', async ({ data }, { rejectWithValue }) => {
  try {
    await apiService().users.updateEmail({ requestBody: data })
  } catch (res) {
    return rejectWithValue(modifyError(res).message)
  }
})
