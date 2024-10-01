import { useAppSelector } from '~/shared/lib/hooks'

const useIsUpdating = () => {
  return useAppSelector(({ updateUserProfile }) => updateUserProfile.isUpdating)
}
const useError = () => {
  return useAppSelector(({ updateUserProfile }) => updateUserProfile.error)
}
export const useUpdateUserProfileSelectors = {
  isUpdating: useIsUpdating,
  error: useError,
}
