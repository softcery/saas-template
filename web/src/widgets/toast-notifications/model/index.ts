import { addToast, slice, removeToast, resetToasts } from './slice'

export const toastNotificationsSlice = {
  reducer: slice.reducer,

  addToast,
  removeToast,
  resetToasts,
}
