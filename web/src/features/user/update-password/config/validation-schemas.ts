import * as Yup from 'yup'

import { PasswordSchema } from '~/entities/viewer'

import { UpdatePasswordFields } from '../types'

const notSimilar = (newPassword: string, oldPassword: string) => {
  if (!newPassword || !oldPassword) return true

  return newPassword !== oldPassword
}

export const UpdatePasswordWithOldPasswordConfirmationSchema = Yup.object().shape({
  [UpdatePasswordFields.NEW_PASSWORD]: PasswordSchema.test(
    'not-similar',
    'New password is too similar to the old password.',
    function (value) {
      const oldPassword = this.parent[UpdatePasswordFields.OLD_PASSWORD]
      return notSimilar(value, oldPassword)
    },
  ),
  [UpdatePasswordFields.OLD_PASSWORD]: PasswordSchema,
  [UpdatePasswordFields.REPEATED_PASSWORD]: PasswordSchema.oneOf(
    [Yup.ref('newPassword'), ''],
    'Passwords must match',
  ),
})

export const UpdatePasswordSchema = Yup.object().shape({
  [UpdatePasswordFields.NEW_PASSWORD]: PasswordSchema,
  [UpdatePasswordFields.REPEATED_PASSWORD]: PasswordSchema.oneOf(
    [Yup.ref('newPassword'), ''],
    'Passwords must match',
  ),
})
