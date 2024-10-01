import { createSlice } from '@reduxjs/toolkit'

import { updatePassword } from './thunks'
import { UpdatePasswordInitialState } from '../types'

const initialState: UpdatePasswordInitialState = {
  isUpdating: false,
  error: '',
}

export const slice = createSlice({
  name: 'features/updateUserPassword',
  initialState: initialState,

  reducers: {
    resetError(state) {
      state.error = ''
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updatePassword.pending, (state) => {
      state.isUpdating = true
      state.error = ''
    })
    builder.addCase(updatePassword.rejected, (state, { payload = '' }) => {
      state.error = payload
    })

    builder.addMatcher(updatePassword.settled, (state) => {
      state.isUpdating = false
    })
  },
})

export const { resetError } = slice.actions
