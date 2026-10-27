---
type: Module
title: src/router
description: Minimal history-API router providing navigate, usePath and Link.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T14:29:00Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ b5726803264bd97b2b8a57a4ce10fade3b3130f9
    title: Codebase knowledge graph
status: stable
---

# Role

A ~30-line replacement for a routing library. The page shown follows
`location.pathname`; there are no params, nested routes or query handling.

# Contents

| Symbol | Lines | Signature | Notes |
| --- | --- | --- | --- |
| `navigate` | 4 | `(path) => void` | `history.pushState` then dispatches a synthetic `PopStateEvent` so subscribers re-render |
| `usePath` | 9 | `() => string` | State seeded from `window.location.pathname`, kept in sync by a `popstate` listener |
| `onChange` | 12 | `() => void` | The listener installed by `usePath`; removed on unmount |
| `Link` | 19 | `({ to, children })` | Renders a real `<a href>` but calls `preventDefault()` and `navigate(to)` |

# Dependencies

* `react` (`useEffect`, `useState`) only - imports nothing from this app.
* Consumed by [src/App](/modules/src-app.md) (`usePath`) and all three
  [pages](/modules/src-pages.md) (`navigate`, `Link`).

# Notes

* `navigate` is the highest fan-in symbol in the codebase (4 callers), so its
  signature is the most expensive thing here to change.
* The synthetic `popstate` dispatch is what makes programmatic navigation work -
  the browser fires `popstate` only for real history movement, not `pushState`.
* `Link` keeps a genuine `href` so middle-click, hover preview and screen
  readers behave; the click handler is what keeps navigation client-side.
* Because `usePath` holds state per component instance, only components that
  call it re-render on navigation. Today that is `App` alone.
