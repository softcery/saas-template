import { useEffect } from 'react'

import { updateTokenRefreshedCallback } from '~/shared/api'
import { useAppDispatch } from '~/shared/lib/hooks'

import { viewerSlice } from '../../model'

export const useUpdateSessionOnTokenRefresh = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    updateTokenRefreshedCallback((tokens) =>
      dispatch(
        viewerSlice.setTokens({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }),
      ),
    )
  }, [])
}
