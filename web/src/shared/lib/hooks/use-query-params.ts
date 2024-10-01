import { useSearchParams } from 'react-router-dom'

export const useQueryParams = (): Record<string, string> => {
  const [result] = useSearchParams()
  return Object.fromEntries(result.entries())
}
