import { createSlice } from '@reduxjs/toolkit'

import { updateProfile } from './thunks'
import { UpdateUserProfileInitialState } from '../types'

const initialState: UpdateUserProfileInitialState = {
  isUpdating: false,
  error: '',
}

export const slice = createSlice({
  name: 'features/updateUserProfile',
  initialState: initialState,

  reducers: {
    resetError(state) {
      state.error = ''
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.isUpdating = true
      state.error = ''
    })
    builder.addCase(updateProfile.rejected, (state, { payload = '' }) => {
      state.error = payload
    })

    builder.addMatcher(updateProfile.settled, (state) => {
      state.isUpdating = false
    })
  },
})

export const { resetError } = slice.actions
