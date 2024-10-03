import React from 'react'
import { Button } from '~/shared/ui/atoms/button'
import { GOOGLE_SIGN_IN_URL } from '../config'

export const SignInWithGoogleButton = () => {
  return (
    <Button onClick={() => window.open(GOOGLE_SIGN_IN_URL, '_self')}>
      Sign in with google
    </Button>
  )
}
