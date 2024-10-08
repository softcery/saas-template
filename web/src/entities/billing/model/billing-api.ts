import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const billingApi = createApi({
  reducerPath: 'billingApi',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ['products'],
})
