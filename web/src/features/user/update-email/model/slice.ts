import { createSlice } from '@reduxjs/toolkit'

import { updateEmail } from './thunks'
import { UpdateUserEmailInitialState } from '../types'

const initialState: UpdateUserEmailInitialState = {
  isUpdating: false,
  error: '',
}

export const slice = createSlice({
  name: 'features/updateUserEmail',
  initialState: initialState,

  reducers: {
    resetError(state) {
      state.error = ''
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateEmail.pending, (state) => {
      state.isUpdating = true
      state.error = ''
    })

    builder.addCase(updateEmail.fulfilled, (state) => {
      state.isUpdating = false
    })

    builder.addCase(updateEmail.rejected, (state, { payload = '' }) => {
      state.error = payload
      state.isUpdating = false
    })
  },
})

export const { resetError } = slice.actions
