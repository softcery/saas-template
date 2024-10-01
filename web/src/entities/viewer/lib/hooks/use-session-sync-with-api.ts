import { useLayoutEffect } from 'react'

import { updateAccessToken, updateRefreshToken } from '~/shared/api'
import { ViewerLocalStorageKeys } from '~/entities/viewer'

import { useViewerSelectors } from './selectors'

export const useSessionSyncWithApi = () => {
  const session = useViewerSelectors.session()

  useLayoutEffect(() => {
    if (!session) return

    localStorage.setItem(ViewerLocalStorageKeys.ACCESS_TOKEN, session.accessToken)
    localStorage.setItem(ViewerLocalStorageKeys.REFRESH_TOKEN, session.refreshToken)

    updateAccessToken(session.accessToken)
    updateRefreshToken(session.refreshToken)
  }, [session])
}
