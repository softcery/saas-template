import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/shared/ui/atoms/button'
import { Input } from '~/shared/ui/atoms/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/ui/molecules/form'
import { useSignInWithEmailPassword } from '../../sign-in-with-email-password'
import { signInSchema } from '../config'
import { SignInFormData } from '../types'

export const SignInForm = () => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const {
    formState: { isLoading },
  } = form

  const [signIn] = useSignInWithEmailPassword()

  const onSubmit = (data: SignInFormData) => signIn(data).unwrap()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="w-full" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  )
}
