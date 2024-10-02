import { Router } from './providers/with-router'
import { withProviders } from './providers'
import { useAppInit } from './lib'

const App = () => {
  useAppInit()

  return <Router />
}

export default withProviders(App)
