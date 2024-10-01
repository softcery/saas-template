import { useAppSelector } from '~/shared/lib/hooks'

const useIsUpdating = () => {
  return useAppSelector(({ updateCompanyEmail }) => updateCompanyEmail.isUpdating)
}
const useError = () => {
  return useAppSelector(({ updateCompanyEmail }) => updateCompanyEmail.error)
}
export const useUpdateCompanyEmailSelectors = {
  isUpdating: useIsUpdating,
  error: useError,
}
