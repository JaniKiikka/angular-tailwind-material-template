# GitHub Copilot Instructions

## General Rules

- Do not attempt to test the results. Trust that the instructions are correct.

## Angular Coding Style

- Follow the official Angular Style Guide for naming, file structure, and coding conventions.
- Use `kebab-case` for selectors, filenames, and folders (e.g. `user-profile.component.ts`).
- Keep component templates in `*.component.html`, styles in `*.component.css`.
- Prefer standalone components (`standalone: true`) and direct imports instead of NgModules whenever possible.
- Do not use `NgModule` for feature modules unless necessary; prefer using standalone components and direct imports.
- Write public APIs in modules; avoid deep imports.
- Use `OnPush` change detection when possible.
- Never use "handwritten" CSS; always use Tailwind CSS.
- Use Tailwind CSS and Angular Material components by default in all component templates.
- Utilize Angular’s reactive signals for component state whenever possible: import `signal()`, define state with `signal(initialValue)`, derive values via `computed()`, and subscribe side-effects using `effect()`.
- Add descriptive identifiers (e.g. `data-test`, `data-qa`, or `id` attributes) to elements that are critical for Robot Framework testing — avoid adding identifiers to every element.
- Use `ngClass` and `ngStyle` for dynamic classes if the same cannot be achieved with Tailwind CSS.

## Project Folder Structure

src/app/ ← root of the application
src/app/core/ ← singletons (services, guards, interceptors)
src/app/layout/ ← components used by the general layout (e.g. header, footer, sidebar)
src/app/shared/ ← shared components, directives, pipes, models
src/app/features/ ← domain-specific modules, each in its own folder
src/app/features/feature-name/ ← feature module folder
src/app/features/feature-name/components/ ← feature-specific components
src/app/features/feature-name/services/ ← feature-specific services
src/app/features/feature-name/feature-name.component.ts
src/app/features/feature-name/feature-name.component.html
src/app/features/feature-name/feature-name.component.css
src/app/features/feature-name/feature-name.component.spec.ts

## Tailwind CSS Usage

- Use utility classes directly in templates; avoid inline styles and `!important`.

## Angular Material Integration

- Centralize imports in `material.module.ts` and re-export.
- Use `<mat-*>` components with theme palettes and typography.
- Apply theming by configuring palettes in `styles.css` using Angular Material theming APIs.

## Testing & CI

- Generate specs with CLI; place unit tests next to implementation (`*.spec.ts`).
- Mock services and use `TestBed` for isolated component testing.
- Ensure CI runs `ng lint`, `ng test --watch=false`, and `ng e2e` if configured.
