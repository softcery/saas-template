import { useAppInit } from './lib'
import { withProviders } from './providers'
import { Router } from './providers/with-router'

const App = () => {
  useAppInit()

  return <Router />
}

export default withProviders(App)
