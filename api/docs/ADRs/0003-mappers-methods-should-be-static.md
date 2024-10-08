# ADR 0003: Mapper Methods Should Be Static

## Date

2024-03-10

## Authors

Andrii Artemenko

## Status

Accepted

## Context

Previously, our project used non-static methods in mapper classes, and mappers were registered as providers in the NestJS dependency injection container. However, we've identified several issues with this approach:

1. Mappers don't typically require complex business logic or external dependencies.
2. Mappers are often used for simple data conversion between different object representations (e.g., domain to persistence, domain to external API).
3. With the recent adoption of the DatabaseContext approach for repository and transaction management, repositories are no longer injected using the DI container, making it impossible to inject mappers as providers into repositories.
4. The current approach may unnecessarily complicate the codebase and slow down development.

## Decision

We have decided to refactor our mapper classes to use static methods instead of instance methods and remove them from the dependency injection container.

## Implementation Details

1. Convert all mapper methods to static methods.
2. Remove mapper classes from the NestJS provider registrations.
3. Update all references to mappers throughout the codebase to use static method calls.
4. Ensure that mappers don't contain any state or dependencies that would prevent them from being static.

Example of refactored mapper:

```typescript
export class DrizzleUserMapper {
  public static toDomain(persistenceUser: DrizzlePersistenceUser): DomainUser {
    // Conversion logic
  }

  public static toPersistence(domainUser: DomainUser): DrizzlePersistenceUser {
    // Conversion logic
  }
}
```

## Consequences

### Positive

1. Simplified mapper usage and management
2. Improved development speed
3. Better alignment with the single responsibility principle (SRP)
4. Easier to use mappers in repositories with the new DatabaseContext approach
5. Reduced complexity in the dependency injection setup

### Negative

1. Potential loss of flexibility in cases where mappers might need injected dependencies (though this is rare)
2. Refactoring effort required to update existing mappers and their usages

## Alternatives Considered

1. Keeping the current approach with instance methods and DI registration
2. Using functional programming approach with pure functions for mapping
3. Implementing a factory pattern for mappers

These alternatives were rejected in favor of static methods, which provide a good balance between simplicity, performance, and maintainability for our use case.

## References

- [Static vs Instance Methods in TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html#static-members)
