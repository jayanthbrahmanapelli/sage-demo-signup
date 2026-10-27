---
type: Module
title: src/App
description: Root component that maps the current path to one of the three page components.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, routing]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T14:29:00Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ b5726803264bd97b2b8a57a4ce10fade3b3130f9
    title: Codebase knowledge graph
status: stable
---

# Role

`src/App.jsx` is the route table. It subscribes to the current path and renders
exactly one page; there is no layout chrome around it.

# Contents

| Symbol | Lines | Notes |
| --- | --- | --- |
| `routes` | 7 | `{ '/signup': Signup, '/login': Login, '/welcome': Welcome }` |
| `App` | 13 | `const Page = routes[path] ?? Signup; return <Page />` |

# Dependencies

* Calls `usePath` from [src/router](/modules/src-router.md)
* Renders the three components from [src/pages](/modules/src-pages.md)
* Rendered by [src/main](/modules/src-main.md)

# Notes

* Any unmapped path - including `/` - falls through to `Signup`. There is no
  404 page.
* Adding a screen means adding a file under `src/pages/` **and** an entry in
  `routes`; see [Common Tasks](/playbooks/common-tasks.md).
