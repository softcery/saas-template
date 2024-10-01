import { useAppSelector } from '~/shared/lib/hooks'

export const useIsUpdating = () => {
  return useAppSelector(({ updateUserEmail }) => updateUserEmail.isUpdating)
}
export const useError = () => {
  return useAppSelector(({ updateUserEmail }) => updateUserEmail.error)
}
export const useUpdateUserEmailSelectors = {
  isUpdating: useIsUpdating,
  error: useError,
}
