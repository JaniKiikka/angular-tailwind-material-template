# Angular Tailwind Material Template

Welcome! Follow these steps to get a new developer up and running.

This project template uses the following key tools/libraries/dependencies:

- <b>TailwindCSS</b> (v4.1) for styling and layouts
- <b>Angular Material</b> (v19.x) for pre-built components
- <b>ESLint + Prettier</b> for linting and formatting

## Prerequisites

- Node.js (latest LTS), https://nodejs.org/en/download
- npm (bundled with Node.js)

## Important

Workspace defaults—like code formatting and hidden config files—are set in `.vscode/settings.json`; edit that file to change which configs appear in the explorer.

## Setup

1. Clone the repo

   ```bash
   git clone https://github.com/JaniKiikka/angular-tailwind-material-template.git
   cd angular-tailwind-material-template
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Install the **Prettier – Code formatter** extension in VS Code. Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

   ```
   ext install esbenp.prettier-vscode
   ```

4. (Optional) If you have a Copilot subscription, enable Copilot instruction files in VS Code.
   Open `.vscode/settings.json` and ensure it contains:

   ```json
   {
     // ...existing settings...
     "github.copilot.enableLocalInstructions": true
   }
   ```

5. Run development server

   ```bash
   ng serve --open
   ```

## Development Guidelines

### Angular Coding Style

- **Naming & File Structure**<br>
  • Use `kebab-case` for selectors, files, and folders
  – Selector: `app-user-profile`
  – File: `user-profile.component.ts`
- **Templates & Styles**<br>
  • Templates in `*.component.html`; styles in `*.component.css`
  • Example:
  ```html
  <div class="p-4 bg-primary text-white">
    <mat-card>
      <h2>User Profile</h2>
    </mat-card>
  </div>
  ```
- **Generation & Standalone Components**<br>
  • Generate with CLI:

  ```bash
  ng generate component features/user-list --standalone
  ```

  • Prefer:

  ```ts
  @Component({
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './example.component.html',
  })
  export class ExampleComponent {}
  ```

  (In Angular v19, `standalone: true` is optional as all components are standalone by default).

- **State Management with Signals**<br>
  • Import and define reactive state:

  ```ts
  import { signal, computed, effect } from '@angular/core';

  const count = signal(0);
  const double = computed(() => count() * 2);
  effect(() => console.log(`Count is ${count()}`));
  ```

- **Change Detection**<br>
  • Use `changeDetection: ChangeDetectionStrategy.OnPush` for better performance
- **Styling**<br>
  • Use Tailwind CSS utilities and Angular Material components by default in all templates

### Project Folder Structure

```
src/app/
├── core/ ← singletons (services, guards, interceptors)
├── layout/ ← components used by the layout (e.g. header, footer, sidebar)
├── shared/ ← shared components, directives, pipes, models
├── features/ ← domain-specific modules, each in its own folder
│ └── feature-name/
│ ├── components/
│ ├── services/
│ ├── feature-name.component.ts
│ └── feature-name.component.html
│ └── feature-name.component.css
│ └── feature-name.component.spec.ts
```

## Angular Material Theme Customization

1. Define or override CSS variables in `src/styles/material-theme.css`:

   ```css
   /* src/styles/material-theme.css */
   @import '~@angular/material/prebuilt-themes/indigo-pink.css';

   :root {
     --color-primary: #3f51b5;
     --color-accent: #e91e63;
     --color-warn: #f44336; /* new variable */
     --font-size-base: 16px;
     --border-radius: 4px;
   }
   ```

2. Apply these variables in global or component CSS:

   ```css
   body {
     font-size: var(--font-size-base);
   }
   .btn-warn {
     background-color: var(--color-warn);
   }
   ```

3. Expose variables to Tailwind—edit `tailwind.config.js`:
   ```js
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         colors: {
           primary: 'var(--color-primary)',
           accent: 'var(--color-accent)',
           warn: 'var(--color-warn)',
         },
         borderRadius: {
           DEFAULT: 'var(--border-radius)',
         },
         fontSize: {
           base: 'var(--font-size-base)',
         },
       },
     },
   };
   ```
