---
type: Module
title: App
description: Root component and bootstrap that map `location.pathname` to a page component.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, entry, routing]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T13:55:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ dd9860e46d77fc36d1722c60a534cdacd34753de
    title: Codebase knowledge graph
status: stable
---

# Files

| File | Contents |
| --- | --- |
| `src/main.jsx` | `createRoot(document.getElementById('root')).render(<App />)` inside `React.StrictMode`; imports `src/style.css` |
| `src/App.jsx` | `routes` map and the `App` component |

# Symbols

| Symbol | Location | Role |
| --- | --- | --- |
| `routes` | `src/App.jsx:7` | Object literal mapping `/signup`, `/login`, `/welcome` to page components |
| `App` | `src/App.jsx:13` | Reads `usePath()` and renders `routes[path] ?? Signup` |

# Behaviour

* Unknown paths fall back to `Signup`, so `/` renders the signup screen.
* `App` is the single consumer of `usePath` — the cluster with cohesion 1.00 in
  [Architecture](/architecture.md).

# Depends on

* [router](/modules/router.md) for `usePath`.
* [pages](/modules/pages.md) for the three route targets.
