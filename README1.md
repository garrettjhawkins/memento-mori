# Web Quickstart

A minimal [Nuxt 4](https://nuxt.com) starter template pre-configured with [Nuxt UI](https://ui.nuxt.com), [Pinia](https://pinia.vuejs.org), [VueUse](https://vueuse.org), and SCSS. Use it as a repo template to skip boilerplate and start building immediately.

## Tech Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Framework | [Nuxt 4](https://nuxt.com) | Vue 3 full-stack framework |
| UI | [Nuxt UI](https://ui.nuxt.com) | Component library + Tailwind CSS |
| State | [Pinia](https://pinia.vuejs.org) | Store-based state management |
| Utilities | [VueUse](https://vueuse.org) | Composable utility functions |
| Styling | [Tailwind CSS](https://tailwindcss.com) + [SCSS](https://sass-lang.com) | Utility-first CSS with SCSS support |
| Language | [TypeScript](https://www.typescriptlang.org) | Type-safe JavaScript |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- npm (included with Node.js)

### Setup

```bash
# Install dependencies
npm install

# Start the dev server at http://localhost:3000
npm run dev
```

## Project Structure

```
web-quickstart/
├── app/
│   ├── app.vue                # Root component
│   ├── assets/
│   │   ├── css/
│   │   │   └── imports.css    # Tailwind CSS + Nuxt UI imports
│   │   └── scss/
│   │       └── main.scss      # Custom SCSS styles
│   └── stores/
│       ├── counter.ts         # Example store (Options API)
│       └── user.ts            # Example store (Composition API)
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── nuxt.config.ts             # Nuxt configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `app/` | Application source code (Nuxt 4 app directory) |
| `app/assets/css/` | Tailwind CSS and Nuxt UI imports (must be `.css`) |
| `app/assets/scss/` | Custom SCSS styles, variables, and mixins |
| `app/stores/` | Pinia stores — auto-imported, no manual registration needed |
| `public/` | Static assets served at the root URL |

## What's Pre-Configured

### Auto-Imports

Nuxt auto-imports everything below — no `import` statements needed:

- **Vue** — `ref`, `computed`, `watch`, `onMounted`, etc.
- **Nuxt UI** — `UApp`, `UCard`, `UButton`, and all other UI components
- **VueUse** — `useMouse`, `usePreferredDark`, `useFetch`, and 200+ composables
- **Pinia** — `defineStore`, `storeToRefs`, and any store in `app/stores/`

### Styling

Two stylesheet layers are loaded in `nuxt.config.ts`:

1. **`imports.css`** — Tailwind CSS + Nuxt UI (must remain a `.css` file)
2. **`main.scss`** — Your custom SCSS with full support for variables, nesting, and mixins

Use Tailwind utility classes in templates and SCSS for anything that needs variables or complex selectors.

### Pinia Stores

Two example stores demonstrate both API styles:

- **`counter.ts`** — Options API style with state, getters, and actions
- **`user.ts`** — Composition API style using `ref` and functions

Stores in `app/stores/` are auto-imported. Use them in any component:

```vue
<script setup lang="ts">
const counterStore = useCounterStore()
const { count } = storeToRefs(counterStore)
</script>
```

## Using as a Template

1. Click **Use this template** on GitHub (or clone and remove the `.git` directory)
2. Run `npm install`
3. Delete the example stores in `app/stores/` and clear `app.vue`
4. Start building:
   - Add pages in `app/pages/` to enable file-based routing
   - Add components in `app/components/` for auto-imported components
   - Add composables in `app/composables/` for shared logic
   - Add server routes in `server/` for API endpoints
   - Add layouts in `app/layouts/` for page layout templates

Nuxt will auto-detect these directories — no configuration required.

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run generate` | Generate static site |
| `npm run preview` | Preview the production build locally |

## Learn More

- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt UI Components](https://ui.nuxt.com/components)
- [Pinia Documentation](https://pinia.vuejs.org)
- [VueUse Functions](https://vueuse.org/functions)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
