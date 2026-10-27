---
type: Module
title: src/main
description: Browser entry point that mounts App into #root and loads the stylesheet.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/main.jsx
tags: [frontend, entry-point]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T16:23:05Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ a4ccb0fcda14fb892e86dffa67f9cd4f96f04a1e
    title: Codebase knowledge graph
status: stable
---

# Role

`src/main.jsx` is the module referenced by the `<script type="module">` tag in
`index.html`. It creates the React root on `#root` and renders
[`App`](/modules/src-app.md) inside `React.StrictMode`.

# Contents

| Symbol | Lines | Notes |
| --- | --- | --- |
| *(module body)* | 1-10 | `createRoot(document.getElementById('root')).render(...)` |

# Dependencies

* `react`, `react-dom/client`
* Renders [src/App](/modules/src-app.md)
* Imports `./style.css`, the only place the global stylesheet is loaded (see
  [Conventions](/conventions.md))

# Notes

`StrictMode` double-invokes effects in development. The only effects in the app
are the `popstate` subscription in [src/router](/modules/src-router.md) and the
redirect guard in `Welcome`; both are idempotent, so this is safe.
