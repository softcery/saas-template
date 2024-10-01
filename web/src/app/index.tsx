import { Router } from './providers/with-router'
import { withProviders } from './providers'
import { useAppInit } from './lib'

import 'animate.css'

const App = () => {
  useAppInit()

  return <Router />
}

export default withProviders(App)
