import { z } from 'zod'
import { signUpSchema } from './config'

export type {
  EmailPasswordCredentialsDto as EmailPasswordCredentials,
  TokensResultDto as TokensResult,
} from '@shared/api-client'
export type SignUpFormData = z.infer<typeof signUpSchema>
