import { useNavigate } from 'react-router-dom'

import { ROUTES_PATH, SettingsQueries } from '~/shared/routing'
import { createQueryParameter } from '~/shared/lib/hooks'

export const useOpenBilling = () => {
  const navigate = useNavigate()

  return () => {
    navigate(
      `${ROUTES_PATH.SETTINGS}${createQueryParameter(SettingsQueries.queryKey, SettingsQueries.tabs.BILLING)}`,
    )
  }
}
