import compose from 'compose-function'

import { withStyles } from './with-styles'
import { withRedux } from './with-redux'
import { withToasts } from './with-toasts'

export const withProviders = compose(withRedux, withStyles, withToasts)
