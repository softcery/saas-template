export type { UpdateUserPasswordDto as UpdateUserPasswordPayload } from '@softcery/detectdata-apiclient'

export interface UpdatePasswordInitialState {
  isUpdating: boolean
  error: string
}

export enum UpdatePasswordFields {
  OLD_PASSWORD = 'oldPassword',
  NEW_PASSWORD = 'newPassword',
  REPEATED_PASSWORD = 'repeatedPassword',
}

export interface UpdatePasswordFormValues {
  [UpdatePasswordFields.NEW_PASSWORD]: string
  [UpdatePasswordFields.REPEATED_PASSWORD]: string
}

export interface UpdatePasswordFormValuesWithConfirmation
  extends UpdatePasswordFormValues {
  [UpdatePasswordFields.REPEATED_PASSWORD]: string
}
