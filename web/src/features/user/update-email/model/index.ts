import { resetError, slice } from './slice'
import { updateEmail } from './thunks'

export const updateUserEmailSlice = {
  reducer: slice.reducer,

  resetError,

  updateEmail,
}
