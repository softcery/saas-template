# ADR 0001: Store RTK Query API in Entity

## Date

2024-03-10

## Authors

Andrii Artemenko
Taras Maister

## Status

Accepted

## Context

We needed to decide on the structure for organizing our RTK Query API calls within our application. During development we are experiencing need to duplicate code between features, which increases amount of boilerplate. The main considerations were:

1. How to maintain a clean and scalable architecture
2. How to enable code splitting and reusability
3. How to avoid creation of full scale independent RTL Query API client for each feature
4. How to note expose feature business logic to entity

## Decision

We have decided to implement a pattern where:

1. A base API is defined at the entity level
2. Feature-specific endpoints are injected into this base API at the feature level

This approach is inspired by the code splitting technique described in the Redux Toolkit documentation.

## Implementation Details

1. At the entity level (e.g., `web/src/entities/billing/model/billing-api.ts`), we define a base API:

```typescript:web/src/entities/billing/model/billing-api.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const billingApi = createApi({
  reducerPath: 'billingApi',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ['products'],
})
```

2. At the feature level (e.g., `web/src/features/billing/get-products/model/slice.ts`), we inject specific endpoints:

```typescript:web/src/features/billing/get-products/model/slice.ts
import { billingApi } from '~/entities/billing'
import { apiService } from '~/shared/api'
import { SubscriptionPlan } from '../types'

export const extendedApi = billingApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<SubscriptionPlan[], void>({
      queryFn: async () => {
        // Implementation details...
      },
      providesTags: ['products'],
    }),
  }),
})
```

## Consequences

### Positive

1. Clear separation of concerns between entities and features
2. Improved development speed by reducing amount of code to write by 30%
3. Enables code splitting, potentially improving performance
4. Consistent with our previous approach using Effector, that was considered as good example of business logic encapsulation

## Alternatives Considered

We considered keeping all API definitions at the feature level, but this would have led to potential duplication and made it harder to share common functionality across features.

## References

- [Redux Toolkit: Code Splitting](https://redux-toolkit.js.org/rtk-query/usage/code-splitting)
