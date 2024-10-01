import { useAppSelector } from '~/shared/lib/hooks'

export const useIsUpdating = () => {
  return useAppSelector(({ updateUserPassword }) => updateUserPassword.isUpdating)
}
export const useError = () => {
  return useAppSelector(({ updateUserPassword }) => updateUserPassword.error)
}
export const useUpdateUserPasswordSelectors = {
  isUpdating: useIsUpdating,
  error: useError,
}
