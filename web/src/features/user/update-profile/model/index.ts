import { resetError, slice } from './slice'
import { updateProfile } from './thunks'

export const updateUserProfileSlice = {
  reducer: slice.reducer,

  resetError,

  updateProfile,
}
