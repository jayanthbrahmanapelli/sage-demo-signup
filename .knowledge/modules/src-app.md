---
type: Module
title: src/App
description: Root component that maps the current path to one of the four page components.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, routing]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T16:23:05Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ a4ccb0fcda14fb892e86dffa67f9cd4f96f04a1e
    title: Codebase knowledge graph
status: stable
---

# Role

`src/App.jsx` is the route table. It subscribes to the current path and renders
exactly one page; there is no layout chrome around it.

# Contents

| Symbol | Lines | Notes |
| --- | --- | --- |
| `routes` | 8 | `{ '/signup': Signup, '/login': Login, '/welcome': Welcome, '/reset-password': ResetPassword }` |
| `App` | 15 | `const Page = routes[path] ?? Signup; return <Page />` |

# Dependencies

* Calls `usePath` from [src/router](/modules/src-router.md)
* Renders the four components from [src/pages](/modules/src-pages.md)
* Rendered by [src/main](/modules/src-main.md)

# Notes

* Any unmapped path - including `/` - falls through to `Signup`. There is no
  404 page.
* A comment above `routes` records the naming rule: each page is routed by its
  kebab-cased file name (`ResetPassword.jsx` -> `/reset-password`).
* Adding a screen means adding a file under `src/pages/` **and** an entry in
  `routes`; see [Common Tasks](/playbooks/common-tasks.md).
