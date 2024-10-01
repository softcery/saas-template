import { FormikContextType } from 'formik'
import { useEffect } from 'react'

import { User } from '~/entities/viewer'

import { ProfileFields, UpdateUserNameFields } from '../../types'

export const useSyncFullNameFormWithUser = (
  resetForm: FormikContextType<UpdateUserNameFields>['resetForm'],
  user?: User,
) => {
  useEffect(() => {
    if (!user) return resetForm()

    resetForm({
      values: {
        [ProfileFields.FIRST_NAME]: user.firstName,
        [ProfileFields.LAST_NAME]: user.lastName,
      },
    })
  }, [user?.firstName, user?.lastName])
}
