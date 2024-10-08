import { viewerSlice, reset, updateSession, setTokens } from './slice'
import { resetModel } from './thunks'

export const viewer = {
  reducer: viewerSlice.reducer,

  reset,
  updateSession,
  setTokens,
  resetModel,
}

export { authApi } from './auth-api'
