import { createSlice } from '@reduxjs/toolkit'

import { updateEmail } from './thunks'
import { UpdateCompanyEmailInitialState } from '../types'

const initialState: UpdateCompanyEmailInitialState = {
  isUpdating: false,
  error: '',
}

export const slice = createSlice({
  name: 'features/updateCompanyEmail',
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
    builder.addCase(updateEmail.rejected, (state, { payload = '' }) => {
      state.error = payload
    })

    builder.addMatcher(updateEmail.settled, (state) => {
      state.isUpdating = false
    })
  },
})

export const { resetError } = slice.actions
