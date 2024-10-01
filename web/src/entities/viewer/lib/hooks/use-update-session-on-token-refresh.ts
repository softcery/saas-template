import { useEffect } from 'react'

import { useAppDispatch } from '~/shared/lib/hooks'
import { updateTokenRefreshedCallback } from '~/shared/api'

import { viewerSlice } from '../../model'

export const useUpdateSessionOnTokenRefresh = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    updateTokenRefreshedCallback((session) =>
      dispatch(viewerSlice.updateSession(session)),
    )
  }, [])
}
