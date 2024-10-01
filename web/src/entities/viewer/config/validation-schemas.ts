import * as Yup from 'yup'

export const PasswordSchema = Yup.string()
  .min(8, 'Password is too short. Minimum length is 8 characters.')
  .max(32, 'Password is too long. Maximum length is 32 characters.')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)/,
    'Password must contain at least one alphabet and one number.',
  )
  .required('This field is required. Please enter your password.')
