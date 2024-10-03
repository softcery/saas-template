import { ReactNode } from 'react'
import { TostVariantProps } from '~/shared/ui/atoms/toast'

export type ToastId = string

export interface Toast extends TostVariantProps {
  title: string
  description: string
  action?: ReactNode
}

export interface IdentifiableToast extends Toast {
  id: ToastId
}

export interface ToastNotificationsInitialState {
  toasts: IdentifiableToast[]
}
