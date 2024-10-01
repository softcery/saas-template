import { Outlet } from 'react-router-dom'

import { Sidebar } from '~/widgets/sidebar'
import { BaseLayout } from '~/shared/ui/layouts'

export const BaseLayoutWithSidebar = () => {
  // TODO - replace with real authorization check
  const isAuthorized = true

  if (isAuthorized) {
    return <BaseLayout page={<Outlet />} sidebar={<Sidebar />} />
  }

  return <Outlet />
}
