import * as Yup from 'yup'

import { CompanyEmailFormFields } from './types'

export const CompanyEmailSchema = Yup.object().shape({
  [CompanyEmailFormFields.COMPANY_EMAIL]: Yup.string().required(
    'Please include company email',
  ),
})
