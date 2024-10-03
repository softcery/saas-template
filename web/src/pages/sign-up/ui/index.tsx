import { Link } from 'react-router-dom'
import { useNavigateAuthenticated } from '~/entities/viewer'
import { SignInWithGoogleButton } from '~/features/auth/sign-in-with-google'
import { SignUpForm } from '~/features/auth/sign-up-with-email-password'
import { RoutesPath } from '~/shared/routing'
import { Card } from '~/shared/ui/atoms/card'

export const SignUpPage = () => {
  useNavigateAuthenticated()

  return (
    <Card className="p-6 max-w-sm flex flex-col gap-4">
      <h2 className="text-2xl">Sign up</h2>
      <SignUpForm />
      <SignInWithGoogleButton />
      <Link to={RoutesPath.SIGN_IN}>Sign in</Link>
    </Card>
  )
}
