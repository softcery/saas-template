export type { UpdateUserProfileDto as UpdateUserProfilePayload } from '@softcery/detectdata-apiclient'

export interface UpdateUserProfileInitialState {
  isUpdating: boolean
  error: string
}

export interface UpdateUserNameFields {
  [ProfileFields.FIRST_NAME]: string
  [ProfileFields.LAST_NAME]: string
}

export enum ProfileFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}
