export type { UpdateUserEmailDto as UpdateUserEmailPayload } from '@softcery/detectdata-apiclient'

export interface UpdateCompanyEmailInitialState {
  isUpdating: boolean
  error: string
}

export enum CompanyEmailFormFields {
  COMPANY_EMAIL = 'companyEmail',
}

export interface UpdateCompanyEmailFormFields {
  [CompanyEmailFormFields.COMPANY_EMAIL]: string
}
