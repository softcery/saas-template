import { FormikContextType } from 'formik'
import { useEffect } from 'react'

import { CompanyEmailFormFields, UpdateCompanyEmailFormFields } from '../../types'

export const useSetDefaultCompanyEmail = (
  resetForm: FormikContextType<UpdateCompanyEmailFormFields>['resetForm'],
  companyEmail: string,
) => {
  useEffect(() => {
    resetForm({
      values: {
        [CompanyEmailFormFields.COMPANY_EMAIL]: companyEmail,
      },
    })
  }, [companyEmail])
}
