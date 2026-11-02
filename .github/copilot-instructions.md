# VIP Angular Project Instructions

Angular 19 SPA with Express backend, RxJS, and MSAL auth.

## Framework and Architecture

- Use Angular standalone components and Angular Router patterns already present in the codebase.
- Keep UI logic in components and reusable business logic in services.
- Prefer signals and computed state where already used; avoid mixing in unrelated state patterns.

## Imports and Modules

- Use ES module imports only.
- Import Angular APIs from official Angular packages.
- Do not use require().
- For component-level dependencies, declare required modules/components in the standalone imports array.

## TypeScript

- Prefer strict typing and avoid any.
- Use unknown when needed and narrow with type guards.
- Keep model contracts aligned with files under frontend/src/app/models.

## Styling

- Use component SCSS files for styling.
- Reuse existing CSS variables and design tokens already defined in the app.
- Avoid inline style attributes unless there is a clear dynamic need.
- Follow existing responsive breakpoints and spacing conventions.

## Angular Conventions

- Keep templates declarative and readable.
- Use Angular control flow syntax consistently with the rest of the app.
- Keep event names, input names, and output names explicit and descriptive.
- Route navigation should go through Angular Router, not direct window navigation.

## Backend/API Alignment

- Frontend changes that rely on API shape must remain compatible with backend/routes and backend/data/db.json.
- Keep date/id/status/tag fields consistent with existing idea schema.

## Naming

- Components, classes, and types: PascalCase.
- Functions, methods, variables, and properties: camelCase.
