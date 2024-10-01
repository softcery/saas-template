import { useSessionSyncWithApi, useUpdateSessionOnTokenRefresh } from '~/entities/viewer'

export const useAppInit = () => {
  useSessionSyncWithApi()
  useUpdateSessionOnTokenRefresh()
}
