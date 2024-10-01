import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiService, modifyError } from '~/shared/api'
import { User, viewerSlice } from '~/entities/viewer'
import { UploadCompanyLogoPayload } from '../types'

export const uploadCompanyLogo = createAsyncThunk<
  User,
  UploadCompanyLogoPayload,
  { rejectValue: string }
>('uploadCompanyLogo/initiate', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const user = await apiService().users.setCompanyLogo({
      formData: payload,
    })

    dispatch(viewerSlice.updateViewer(user))

    return user
  } catch (res) {
    return rejectWithValue(modifyError(res).message)
  }
})
