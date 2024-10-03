import { z } from 'zod'
import { signInSchema } from './config'

export type {
  EmailPasswordCredentialsDto as EmailPasswordCredentials,
  TokensResultDto as TokensResult,
} from '@shared/api-client'

export type SignInFormData = z.infer<typeof signInSchema>
