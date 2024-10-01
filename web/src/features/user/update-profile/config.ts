import * as Yup from 'yup'

import { ProfileFields } from './types'

export const FirstLastNameSchema = Yup.object().shape({
  [ProfileFields.FIRST_NAME]: Yup.string().required('Please include first name'),
  [ProfileFields.LAST_NAME]: Yup.string().required('Please include last name'),
})
