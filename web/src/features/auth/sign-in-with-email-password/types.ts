import { z } from 'zod'
import { signInSchema } from './config'

export type {
  EmailPasswordCredentialsDto as EmailPasswordCredentials,
  TokensResultDto as TokensResult,
} from '@softcery/sass-template-apiclient'

export type SignInFormData = z.infer<typeof signInSchema>
