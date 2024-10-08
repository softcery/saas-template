# ADR 0002: Use Repositories from Database Context

## Date

2024-03-10

## Authors

Andrii Artemenko

## Status

Accepted

## Context

In our current application architecture, we've identified a potential issue with data consistency when multiple repositories are used within a single use case. Specifically:

1. When one repository operation succeeds and a subsequent operation in another repository fails, it can lead to an inconsistent database state.
2. This inconsistency can result in partial data updates, potentially causing application instability.
3. There's no unified mechanism to manage transactions across multiple repository operations.

## Decision

We have decided to implement a Database Context that will provide access to all repositories and manage database transactions. This approach will implement the Unit of Work pattern.

## Implementation Details

1. Create a DatabaseContext class that will:

   - Provide access to all repositories in the application
   - Manage database connections or connection pools
   - Handle transaction management (begin, commit, rollback)

2. Modify repositories to accept and use the shared database manager or transaction details from the DatabaseContext.

3. Update use cases to utilize the DatabaseContext for accessing repositories.

4. Implement automatic transaction management in use cases, ensuring all repository operations within a use case are part of a single transaction.

Example of contract:

```typescript
export interface IDbContext {
  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;
}

export interface IDbRepositories {
  userRepository: IUserRepository;
  paymentCustomerRepository: IPaymentCustomerRepository;
}

export interface IDbContext extends IDbRepositories {
  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;
}
```

## Consequences

### Positive

1. Improved data consistency across multiple repository operations
2. Simplified transaction management in use cases
3. Better error handling and rollback capabilities
4. Centralized management of database connections and repositories

### Negative

1. Increased complexity in application setup (need to register repositories with DatabaseContext)
2. Reduces ability to inject providers to repositories, as repositories will be created out of DI container

## Alternatives Considered

1. Continuing with the current approach of independent repositories (in some cases it will take more time that estimated to keep system stable, may lead to unexpected errors)
2. Implementing transaction management at the use case level without a DatabaseContext (previous research showed that it is not easy to implement and may lead to code duplication)
3. Using an ORM with built-in Unit of Work pattern support (but then ORM details will be leaked to the domain layer)

These alternatives were rejected in favor of the DatabaseContext approach, which provides a good balance between consistency, control, and ease of use.

## References

- [Demystifying the Unit of Work Design Pattern: A Comprehensive Guide](https://medium.com/@sohail.aslam9987/demystifying-the-unit-of-work-design-pattern-a-comprehensive-guide-6eee92231558)
- [Type ORM DbContext implementation example](https://github.com/SerhiiHalych/nestjs-cinema/blob/203e2b1edd7e880436e78c78c49f22e02814fe8a/src/common/infrastructure/persistence/DbContext.ts)
