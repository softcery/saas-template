import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiService, modifyError } from '~/shared/api'

import { UpdateUserEmailPayload } from '../types'

export const updateEmail = createAsyncThunk<
  void,
  UpdateUserEmailPayload,
  { rejectValue: string }
>('updateUserEmail/initiate', async (payload, { rejectWithValue }) => {
  try {
    await apiService().users.updateEmail({ requestBody: payload })
  } catch (res) {
    return rejectWithValue(modifyError(res).message)
  }
})
