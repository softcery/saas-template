import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiService } from '~/shared/api'
import { TokensResult, EmailPasswordCredentials } from '../types'
import { viewerSlice } from '~/entities/viewer'

export const signInWithEmailPasswordApi = createApi({
  reducerPath: 'signInWithEmailPassword',
  baseQuery: fakeBaseQuery(),
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
        dispatch(viewerSlice.setTokens(data))
      },
    }),
  }),
})
