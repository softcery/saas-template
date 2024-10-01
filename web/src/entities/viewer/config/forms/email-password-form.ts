import * as Yup from 'yup'

import { PasswordSchema } from '../validation-schemas'

export enum EmailPasswordFields {
  COMPANY_EMAIL = 'companyEmail',
  PASSWORD = 'password',
}

export const EmailPasswordSchema = Yup.object().shape({
  [EmailPasswordFields.COMPANY_EMAIL]: Yup.string()
    .email('Please enter a valid email address.')
    .required('This field is required. Please enter your email address.'),
  [EmailPasswordFields.PASSWORD]: PasswordSchema,
})
