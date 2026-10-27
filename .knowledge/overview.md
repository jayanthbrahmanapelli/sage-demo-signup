---
type: Codebase Overview
title: sage-demo-signup
description: A three-page React + Vite demo for account signup, login and a signed-in welcome screen, with no backend.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/
tags: [frontend, react, vite, demo]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T13:55:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ dd9860e46d77fc36d1722c60a534cdacd34753de
    title: Codebase knowledge graph
status: stable
---

# Purpose

A self-contained demo of an account signup flow. A visitor creates an account on
`/signup`, authenticates on `/login`, and lands on `/welcome`. There is no server:
accounts live in the browser's `localStorage` and the active session in
`sessionStorage`.

# Stack

| Area | Choice |
| --- | --- |
| UI | React 18.3.1 (`react`, `react-dom`) |
| Build | Vite 5.4.10 with `@vitejs/plugin-react` |
| Routing | hand-rolled, see [router](/modules/router.md) |
| Styling | one plain stylesheet, `src/style.css` |
| Tests | `@playwright/test` is a devDependency; no spec files are in the graph |

Languages in the graph: JavaScript (9 files), HTML, CSS, YAML.

# Scripts

| Script | Command |
| --- | --- |
| `dev` | `vite` |
| `build` | `vite build` |
| `preview` | `vite preview` |

# Entry points

| File | Role |
| --- | --- |
| `index.html` | Document shell; mounts `#root` and loads `/src/main.jsx` |
| `src/main.jsx` | Calls `createRoot(...).render(<App />)` inside `React.StrictMode` and imports `src/style.css` |
| `src/App.jsx` | `App` resolves `usePath()` against the `routes` map — see [App](/modules/app.md) |
| `vite.config.js` | `defineConfig` with the React plugin |

# Module map

* [App](/modules/app.md) - root component, depends on [router](/modules/router.md) and [pages](/modules/pages.md).
* [pages](/modules/pages.md) - the three screens; depends on [components](/modules/components.md), [router](/modules/router.md) and [store](/modules/store.md).
* [components](/modules/components.md) - presentational primitives, no dependencies.
* [router](/modules/router.md) - History API wrapper, no dependencies.
* [store](/modules/store.md) - browser-storage persistence, no dependencies.

See [Architecture](/architecture.md) for layering and [Conventions](/conventions.md)
for the rules those modules follow.
