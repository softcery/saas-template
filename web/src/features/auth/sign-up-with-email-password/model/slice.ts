import { authApi } from '~/entities/viewer'
import { apiService } from '~/shared/api'
import { EmailPasswordCredentials, TokensResult } from '../types'

export const extendedApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    signUpWithEmailPassword: build.mutation<TokensResult, EmailPasswordCredentials>({
      queryFn: async (credentials: EmailPasswordCredentials) => {
        try {
          const data = await apiService().auth.signUp({ requestBody: credentials })
          return { data }
        } catch (error) {
          if (error instanceof Error) {
            return { error: new Error(error['message']) }
          } else {
            return { error: new Error('Unknown error') }
          }
        }
      },
    }),
  }),
})
