import { FC } from 'react'
import { FormikContextType } from 'formik'

import { Flex, Form, TextInputFormik } from '~/shared/ui/atoms'

import {
  UpdatePasswordFormValuesWithConfirmation,
  UpdatePasswordFields,
  UpdatePasswordFormValues,
} from '../../types'
import styles from './styles.module.css'
interface UpdateUserPasswordIInlineFormProps {
  formId: string
  handleSubmit: FormikContextType<UpdatePasswordFormValuesWithConfirmation>['handleSubmit']
}

export const UpdateUserPasswordIInlineForm: FC<UpdateUserPasswordIInlineFormProps> = ({
  formId,
  handleSubmit,
}) => {
  return (
    <Form id={formId} onSubmit={handleSubmit} className={styles.form}>
      <TextInputFormik
        required
        size="sm"
        label="Old password"
        type="password"
        autoComplete="current-password"
        name={UpdatePasswordFields.OLD_PASSWORD}
      />

      <TextInputFormik
        required
        size="sm"
        label="New password"
        type="password"
        autoComplete="new-password"
        name={UpdatePasswordFields.NEW_PASSWORD}
        className={styles.newPassword}
      />

      <TextInputFormik
        required
        size="sm"
        type="password"
        label="Repeat new password"
        autoComplete="new-password"
        name={UpdatePasswordFields.REPEATED_PASSWORD}
        className={styles.oldPassword}
      />
    </Form>
  )
}

interface UpdatePasswordFormProps {
  formId: string
  handleSubmit: FormikContextType<UpdatePasswordFormValues>['handleSubmit']
}

export const UpdatePasswordForm: FC<UpdatePasswordFormProps> = ({
  formId,
  handleSubmit,
}) => {
  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <Flex direction="column" gap={24}>
        <TextInputFormik
          label="New password"
          type="password"
          autoComplete="new-password"
          name={UpdatePasswordFields.NEW_PASSWORD}
          className={styles.newPassword}
        />

        <TextInputFormik
          size="sm"
          type="password"
          label="Repeat new password"
          autoComplete="new-password"
          name={UpdatePasswordFields.REPEATED_PASSWORD}
          className={styles.oldPassword}
        />
      </Flex>
    </Form>
  )
}
