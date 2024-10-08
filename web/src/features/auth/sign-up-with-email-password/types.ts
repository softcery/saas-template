import { z } from 'zod'
import { signUpSchema } from './config'

export type {
  EmailPasswordCredentialsDto as EmailPasswordCredentials,
  TokensResultDto as TokensResult,
} from '@softcery/sass-template-apiclient'
export type SignUpFormData = z.infer<typeof signUpSchema>
