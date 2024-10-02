import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiService } from '~/shared/api'
import { TokensResult, EmailPasswordCredentials } from '../types'

export const signUpWithEmailPasswordApi = createApi({
  reducerPath: 'signUpWithEmailPassword',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    signUpWithEmailPassword: build.mutation<TokensResult, EmailPasswordCredentials>({
      queryFn: async (credentials: EmailPasswordCredentials) => {
        try {
          const data = await apiService().auth.signIn({ requestBody: credentials })
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
