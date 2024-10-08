# ADR 0001: Move Separately Tested Modules to Libs

## Date

2024-03-10

## Authors

Andrii Artemenko

## Status

Accepted

## Context

We have identified that certain components and modules in our project, such as Passport strategies and parsers, are not tightly coupled with the project's infrastructure or application domain. These modules:

1. Can be considered as potentially reusable across different projects
2. Are separately testable
3. Don't require deep integration with the project's core infrastructure
4. May contain business logic or utility functions that are relatively independent

Currently, these modules are scattered across the project, making it difficult to manage and potentially leading to code duplication.

## Decision

We have decided to move these separately tested and loosely coupled modules into a `libs` folder within our project structure. This approach will treat these modules as internal libraries, similar to npm packages.

## Implementation Details

1. Create a `libs` folder at the root of the project.
2. Move eligible modules into separate subdirectories within the `libs` folder.
3. Ensure each module in the `libs` folder has its own tests, documentation, and clear API.
4. Update import statements throughout the project to reference the new locations in the `libs` folder.

Example structure:

```

api/
├── src/
│ ├── libs/
│ │ ├── passport-strategies/
│ │ ├── parsers/
│ │ └── calculation-utils/
│ ├── shared/
│ ├── core/
│ └── modules/
└── ...

```

## Consequences

### Positive

1. Improved code organization and clarity
2. Easier to identify and manage reusable components
3. Potential for code reuse across different projects
4. Simplified testing of these modules in isolation
5. Clearer separation of concerns between core application logic and utility functions

### Negative

1. Initial refactoring effort required to move and reorganize code
2. May require updates to build and deployment processes
3. Potential for over-modularization if not carefully managed

## Alternatives Considered

1. Keeping modules within the existing `src` structure
2. Moving modules to a separate `shared` folder
3. Creating separate npm packages for each module

These alternatives were rejected in favor of the `libs` folder approach, which provides a balance between modularity and project cohesion.
