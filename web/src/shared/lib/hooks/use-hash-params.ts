import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export const useHashParams = () => {
  const { hash } = useLocation()

  return useMemo(() => {
    const params = new URLSearchParams(hash.slice(1))

    const entries: { [key: string]: string } = {}

    for (const [key, value] of params.entries()) {
      entries[key] = value
    }
    return entries
  }, [hash])
}
