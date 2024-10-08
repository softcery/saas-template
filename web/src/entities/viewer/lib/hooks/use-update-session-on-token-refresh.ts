import { useEffect } from 'react'

import { updateTokenRefreshedCallback } from '~/shared/api'
import { useAppDispatch } from '~/shared/lib/hooks'

import { viewer } from '../../model'

export const useUpdateSessionOnTokenRefresh = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    updateTokenRefreshedCallback((tokens) =>
      dispatch(
        viewer.setTokens({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }),
      ),
    )
  }, [])
}
