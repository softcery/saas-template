import { authApi } from '~/entities/viewer'
import { apiService } from '~/shared/api'
import { UpdateUserPasswordPayload } from '../types'

export const extendedApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    updatePassword: build.mutation<void, UpdateUserPasswordPayload>({
      queryFn: async (credentials: UpdateUserPasswordPayload) => {
        try {
          const data = await apiService().auth.changePassword({
            requestBody: credentials,
          })
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
