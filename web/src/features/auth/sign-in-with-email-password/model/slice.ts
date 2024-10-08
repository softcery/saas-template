import { authApi, viewer } from '~/entities/viewer'
import { apiService } from '~/shared/api'
import { EmailPasswordCredentials, TokensResult } from '../types'

export const extendedApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    signInWithEmailPassword: build.mutation<TokensResult, EmailPasswordCredentials>({
      queryFn: async (credentials: EmailPasswordCredentials) => {
        try {
          const data = await apiService().auth.signIn({ requestBody: credentials })

          return { data }
        } catch (error) {
          if (error instanceof Error) {
            return { error: { message: error.message } }
          } else {
            return { error: { message: 'Unknown error' } }
          }
        }
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled
        dispatch(viewer.setTokens(data))
      },
    }),
  }),
})
