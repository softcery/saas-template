import { useAppDispatch } from '~/shared/lib/hooks'
import { useQueryParams } from '~/shared/lib/hooks/use-query-params'
import { isValidSessionParams } from '../is-valid-session-params'
import { viewerSlice } from '../../model'
import { useEffect } from 'react'

export const useAuthFromHashParams = () => {
  const dispatch = useAppDispatch()
  const params = useQueryParams()

  useEffect(() => {
    if (!params || !isValidSessionParams(params)) return

    if (params.token_type.toLowerCase() !== 'bearer') return

    dispatch(
      viewerSlice.setTokens({
        accessToken: params.access_token,
        refreshToken: params.refresh_token,
      }),
    )
  }, [params, dispatch])
}
