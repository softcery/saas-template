import { useAppSelector } from '~/shared/lib/hooks'

const useSession = () => {
  return useAppSelector(({ viewer }) => viewer.session)
}

const useAccessToken = () => {
  return useAppSelector(({ viewer }) => viewer.accessToken)
}

const useRefreshToken = () => {
  return useAppSelector(({ viewer }) => viewer.refreshToken)
}

export const useViewerSelectors = {
  session: useSession,
  accessToken: useAccessToken,
  refreshToken: useRefreshToken,
}
