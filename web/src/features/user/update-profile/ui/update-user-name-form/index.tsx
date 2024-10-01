import { FC } from 'react'

import { Form, TextInputFormik } from '~/shared/ui/atoms'

import { UpdateUserNameFields, ProfileFields } from '../../types'
import styles from './styles.module.css'
import { FormikContextType } from 'formik/dist/types'

interface Props {
  formId: string
  handleSubmit: FormikContextType<UpdateUserNameFields>['handleSubmit']
}

export const UpdateUserNameForm: FC<Props> = ({ formId, handleSubmit }) => {
  return (
    <Form id={formId} className={styles.form} onSubmit={handleSubmit}>
      <TextInputFormik
        required
        size="sm"
        label="First name"
        autoComplete="given-name"
        placeholder="John"
        name={ProfileFields.FIRST_NAME}
      />

      <TextInputFormik
        required
        size="sm"
        label="Last name"
        autoComplete="family-name"
        placeholder="Doe"
        name={ProfileFields.LAST_NAME}
      />
    </Form>
  )
}
