import { useEffect } from 'react'

import { viewer, isValidSessionParams } from '~/entities/viewer'
import { useAppDispatch, useHashParams } from '~/shared/lib/hooks'

export const useAuthFromHashParams = () => {
  const dispatch = useAppDispatch()
  const hashParams = useHashParams()

  useEffect(() => {
    if (!hashParams || !isValidSessionParams(hashParams)) return

    if (hashParams.token_type !== 'bearer') return

    dispatch(
      viewer.setTokens({
        accessToken: hashParams.access_token,
        refreshToken: hashParams.refresh_token,
      }),
    )
  }, [hashParams, dispatch])
}
