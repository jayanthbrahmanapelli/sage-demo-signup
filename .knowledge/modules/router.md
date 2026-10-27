---
type: Module
title: router
description: Hand-rolled History API router providing `navigate`, `usePath` and `Link`.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T13:55:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ dd9860e46d77fc36d1722c60a534cdacd34753de
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Location | Role |
| --- | --- | --- |
| `navigate` | `src/router.jsx:4` | `history.pushState` then dispatch a synthetic `PopStateEvent('popstate')` |
| `usePath` | `src/router.jsx:9` | `useState(window.location.pathname)` kept in sync by a `popstate` listener |
| `onChange` | `src/router.jsx:12` | The listener registered and removed inside `usePath`'s effect |
| `Link` | `src/router.jsx:19` | `<a href={to}>` whose `onClick` prevents default and calls `navigate(to)` |

# Why the synthetic event

`history.pushState` does not fire `popstate`. `navigate` dispatches one manually
so that every mounted `usePath` re-reads `location.pathname`. Bypassing
`navigate` — calling `pushState` directly — will change the URL without
re-rendering.

# Fan-in

`navigate` has fan-in 4 and `Link` fan-in 3, the two highest in the graph
alongside `Card`. Both are consumed only by [pages](/modules/pages.md) and
`usePath` only by [App](/modules/app.md).

# Limits

* No route parameters, query parsing, nested routes or scroll restoration.
* `Link` always calls `preventDefault`, so modifier-clicks (open in new tab) do
  not work.
* The package has zero outbound calls; it depends on nothing in this repository.
