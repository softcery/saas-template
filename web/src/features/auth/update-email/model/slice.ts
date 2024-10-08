import { authApi } from '~/entities/viewer'
import { apiService } from '~/shared/api'
import { UpdateUserEmailPayload } from '../types'

export const extendedApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    changeEmail: build.mutation<void, UpdateUserEmailPayload>({
      queryFn: async (payload: UpdateUserEmailPayload) => {
        try {
          await apiService().auth.changeEmail({ requestBody: payload })
          return { data: undefined }
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
