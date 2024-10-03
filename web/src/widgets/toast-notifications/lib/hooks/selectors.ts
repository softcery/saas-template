import { useAppSelector } from '~/shared/lib/hooks'

const useToasts = () => {
  return useAppSelector(({ toastNotifications }) => toastNotifications.toasts)
}

export const useToastsNotificationsSelectors = {
  toasts: useToasts,
}
