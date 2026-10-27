---
type: Codebase Overview
title: sage-demo-signup
description: Vite + React single-page demo for account signup, login and a welcome screen, backed by browser storage.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/
tags: [frontend, react, vite, demo]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T14:29:00Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ b5726803264bd97b2b8a57a4ce10fade3b3130f9
    title: Codebase knowledge graph
status: stable
---

# Purpose

A deliberately small demo application ("Acme Account") that exercises a complete
signup -> login -> welcome flow entirely in the browser. There is no backend;
accounts live in `localStorage` and the signed-in user in `sessionStorage`.

# Stack

| Concern | Choice |
| --- | --- |
| UI | `react` 18.3.1, `react-dom` 18.3.1 |
| Build / dev server | `vite` 5.4.10 with `@vitejs/plugin-react` 4.3.3 |
| Tests (dev dependency) | `@playwright/test` 1.47.2 |
| Routing | Hand-rolled, see [src/router](/modules/src-router.md) |
| Styling | One global stylesheet, `src/style.css` |
| Module system | ESM (`"type": "module"`) |

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
| `src/main.jsx` | Creates the React root - see [src/main](/modules/src-main.md) |
| `src/App.jsx` | Path-to-page dispatch - see [src/App](/modules/src-app.md) |
| `vite.config.js` | Vite config; registers the React plugin |

# Source layout

```
src/
  main.jsx          entry
  App.jsx           route table
  router.jsx        navigate / usePath / Link
  store.js          account persistence
  style.css         global styles
  components/Card.jsx   Card, Field, Message
  pages/Signup.jsx      Signup
  pages/Login.jsx       Login
  pages/Welcome.jsx     Welcome
```

The structure and the dependencies between these files are described in
[Architecture](/architecture.md); the rules they follow are in
[Conventions](/conventions.md).
