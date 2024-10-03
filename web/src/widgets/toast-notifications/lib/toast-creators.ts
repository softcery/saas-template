import { IdentifiableToast, Toast } from '../types'

export const createSuccessToast = (data: Toast): IdentifiableToast => ({
  ...data,
  variant: 'default',
  id: crypto.randomUUID(),
})

export const createErrorToast = (data: Toast): IdentifiableToast => ({
  ...data,
  variant: 'destructive',
  id: crypto.randomUUID(),
})
