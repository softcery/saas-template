import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutesPath } from '~/shared/routing'
import { useViewerSelectors } from './selectors'

export const useNavigateAuthenticated = () => {
  const navigate = useNavigate()
  const session = useViewerSelectors.session()

  useEffect(() => {
    if (session) {
      navigate(RoutesPath.BILLING, { replace: true })
    }
  }, [session, navigate])
}
