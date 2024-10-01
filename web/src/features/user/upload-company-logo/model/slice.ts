import { createSlice } from '@reduxjs/toolkit'

import { uploadCompanyLogo } from './thunks'
import { UploadCompanyLogoInitialState } from '../types'

const initialState: UploadCompanyLogoInitialState = {
  isUpdating: false,
  error: '',
}

export const slice = createSlice({
  name: 'features/uploadCompanyLogo',
  initialState: initialState,

  reducers: {
    resetError(state) {
      state.error = ''
    },
  },

  extraReducers: (builder) => {
    builder.addCase(uploadCompanyLogo.pending, (state) => {
      state.isUpdating = true
      state.error = ''
    })
    builder.addCase(uploadCompanyLogo.rejected, (state, { payload = '' }) => {
      state.error = payload
    })

    builder.addMatcher(uploadCompanyLogo.settled, (state) => {
      state.isUpdating = false
    })
  },
})

export const { resetError } = slice.actions
