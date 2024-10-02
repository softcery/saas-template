import { slice, reset, updateSession, setTokens } from './slice'
import { resetModel } from './thunks'

export const viewerSlice = {
  reducer: slice.reducer,

  reset,
  updateSession,
  setTokens,
  resetModel,
}
