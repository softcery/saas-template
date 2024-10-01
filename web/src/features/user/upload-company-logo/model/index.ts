import { resetError, slice } from './slice'
import { uploadCompanyLogo } from './thunks'

export const uploadCompanyLogoSlice = {
  reducer: slice.reducer,

  resetError,

  uploadCompanyLogo,
}
