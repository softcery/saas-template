import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { SendResetPasswordConfirmationPayload } from '../types'
import { apiService } from '~/shared/api'

export const sendPasswordResetConfirmationApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    sendPasswordResetConfirmation: build.mutation<
      void,
      SendResetPasswordConfirmationPayload
    >({
      queryFn: async (payload) => {
        await apiService().auth.sendPasswordResetConfirmation({ requestBody: payload })
        return { data: undefined }
      },
    }),
  }),
})
