import { authApi } from '~/entities/viewer'
import { apiService } from '~/shared/api'
import { SendResetPasswordConfirmationPayload } from '../types'

export const extendedApi = authApi.injectEndpoints({
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
