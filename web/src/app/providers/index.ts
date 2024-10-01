import compose from 'compose-function'

import { withRedux } from './with-redux'
import { withToasts } from './with-toasts'

export const withProviders = compose(withRedux, withToasts)
