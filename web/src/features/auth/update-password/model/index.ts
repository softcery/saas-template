import { resetError, slice } from './slice'
import { updatePassword } from './thunks'

export const updateUserPasswordSlice = {
  reducer: slice.reducer,

  resetError,

  updatePassword,
}
