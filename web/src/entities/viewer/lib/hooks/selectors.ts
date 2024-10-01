import { useAppSelector } from '~/shared/lib/hooks'

const useSession = () => {
  return useAppSelector(({ viewer }) => viewer.session)
}

const useUser = () => {
  return useAppSelector(({ viewer }) => viewer.user)
}

const useUserSubscription = () => {
  return useAppSelector(({ viewer }) => viewer.userSubscription)
}
const usePlanBalance = () => {
  return useAppSelector(({ viewer }) => viewer.planBalance)
}
export const useViewerSelectors = {
  session: useSession,
  user: useUser,
  userSubscription: useUserSubscription,
  planBalance: usePlanBalance,
}
