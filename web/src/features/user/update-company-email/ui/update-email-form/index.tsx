import { FC } from 'react'
import { FormikContextType } from 'formik'

import { Form, TextInputFormik } from '~/shared/ui/atoms'

import { UpdateCompanyEmailFormFields, CompanyEmailFormFields } from '../../types'

interface Props {
  formId: string
  handleSubmit: FormikContextType<UpdateCompanyEmailFormFields>['handleSubmit']
}

export const UpdateCompanyEmailForm: FC<Props> = ({ formId, handleSubmit }) => {
  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <TextInputFormik
        required
        size="sm"
        label="Email"
        autoComplete="email"
        placeholder="john.doe@example.com"
        name={CompanyEmailFormFields.COMPANY_EMAIL}
      />
    </Form>
  )
}
