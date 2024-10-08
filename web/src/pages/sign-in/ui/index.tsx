import { Link } from 'react-router-dom'
import { useNavigateAuthenticated } from '~/entities/viewer'
import { SignInForm } from '~/features/auth/sign-in-with-email-password'
import { SignInWithGoogleButton } from '~/features/auth/sign-in-with-google'
import { RoutesPath } from '~/shared/routing'
import { Card } from '~/shared/ui/atoms/card'

export const SignInPage = () => {
  useNavigateAuthenticated()
  return (
    <Card className="p-6 max-w-sm flex flex-col gap-4">
      <h2 className="text-2xl">Sign in</h2>
      <SignInForm />
      <SignInWithGoogleButton />
      <Link to={RoutesPath.SIGN_UP}>Sign up</Link>
    </Card>
  )
}
