import { useAppInit } from './lib'
import { withProviders } from './providers'
import { Router } from './providers/with-router'
import './styles/index.css'

const App = () => {
  useAppInit()

  return <Router />
}

export default withProviders(App)
