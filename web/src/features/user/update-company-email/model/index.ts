import { resetError, slice } from './slice'
import { updateEmail } from './thunks'

export const updateCompanyEmailSlice = {
  reducer: slice.reducer,

  resetError,

  updateEmail,
}
