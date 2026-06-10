# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run serve   # dev server with hot-reload
npm run build   # production build
npm run lint    # lint and auto-fix
```

No test framework is configured. There are no test commands.

## Architecture

This is a Vue 3 SPA with state centralized in `App.vue` and two child components.

```
src/main.js          → mounts App.vue onto #app
src/App.vue          → owns books[] state; handles addBook / removeBook
src/components/
  BookList.vue       → receives :books prop, emits remove-book
  AddBook.vue        → owns form input state, emits add-book with { title }
```

**Data flow:** App.vue holds the single source of truth (`books` array). Children communicate upward via custom events (`add-book`, `remove-book`); App.vue mutates state and passes updated props back down.

## Conventions

- Component filenames and tags: PascalCase (`BookList`, `AddBook`)
- Custom events: kebab-case (`add-book`, `remove-book`)
- Props and methods: camelCase
- `@/` path alias resolves to `src/`
- ESLint config: `plugin:vue/vue3-essential` + `eslint:recommended` with `@babel/eslint-parser`
