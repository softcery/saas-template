import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RoutesPath } from '~/shared/routing'
import { SignInPage } from '../../pages/sign-in/ui'
import { SignUpPage } from '~/pages/sign-up'
import { BillingPage } from '~/pages/billing'

export const Router = () => {
  const router = createBrowserRouter([
    { path: RoutesPath.SIGN_IN, element: <SignInPage /> },
    { path: RoutesPath.SIGN_UP, element: <SignUpPage /> },
    { path: RoutesPath.BILLING, element: <BillingPage /> },
  ])

  return <RouterProvider router={router} />
}
