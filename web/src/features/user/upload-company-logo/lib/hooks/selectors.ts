import { useAppSelector } from '~/shared/lib/hooks'

const useIsUpdating = () => {
  return useAppSelector(({ uploadCompanyLogoSlice }) => uploadCompanyLogoSlice.isUpdating)
}
const useError = () => {
  return useAppSelector(({ uploadCompanyLogoSlice }) => uploadCompanyLogoSlice.error)
}
export const useUploadCompanyLogoSelectors = {
  isUpdating: useIsUpdating,
  error: useError,
}
