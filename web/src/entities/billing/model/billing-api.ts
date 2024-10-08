import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const billingApi = createApi({
  reducerPath: 'billingApi',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ['products'],
})
