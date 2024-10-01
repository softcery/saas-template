import {
  slice,
  reset,
  updateViewer,
  updateSession,
  updateUserSubscription,
  updatePlanBalance,
} from './slice'
import { resetModel } from './thunks'

export const viewerSlice = {
  reducer: slice.reducer,

  reset,
  updateViewer,
  updateSession,
  updateUserSubscription,
  updatePlanBalance,

  resetModel,
}
