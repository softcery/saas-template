import { useLayoutEffect } from 'react'

import { updateAccessToken, updateRefreshToken } from '~/shared/api'
import { ViewerLocalStorageKeys } from '~/entities/viewer'

import { useViewerSelectors } from './selectors'

export const useSessionSyncWithApi = () => {
  const accessToken = useViewerSelectors.accessToken()
  const refreshToken = useViewerSelectors.refreshToken()

  useLayoutEffect(() => {
    if (refreshToken) {
      localStorage.setItem(ViewerLocalStorageKeys.REFRESH_TOKEN, refreshToken)
      updateRefreshToken(refreshToken)
    }

    if (accessToken) {
      localStorage.setItem(ViewerLocalStorageKeys.ACCESS_TOKEN, accessToken)
      updateAccessToken(accessToken)
    }
  }, [accessToken, refreshToken])
}
