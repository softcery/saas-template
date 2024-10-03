import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useViewerSelectors } from './selectors'
import { RoutesPath } from '~/shared/routing'

export const useNavigateAuthenticated = () => {
  const navigate = useNavigate()
  const session = useViewerSelectors.session()

  useLayoutEffect(() => {
    if (session) {
      navigate(RoutesPath.BILLING)
    }
  }, [session, navigate])
}
