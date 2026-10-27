---
type: Architecture
title: Application architecture
description: Three-layer client-only app: page components call a hand-rolled router, a localStorage account store and shared Card primitives.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src
tags: [architecture, frontend, react]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T14:29:00Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ b5726803264bd97b2b8a57a4ce10fade3b3130f9
    title: Codebase knowledge graph
status: stable
---

# Layers

| Layer | Members | Role |
| --- | --- | --- |
| entry | `src/main.jsx`, `src/App.jsx`, `src/pages/*` | Mount the root and own all user-facing behaviour; only outbound calls |
| core | `src/components/Card.jsx`, `src/router.jsx`, `src/store.js` | High fan-in leaves; no outbound calls into the app |

There is no server, no data-fetching layer and no global state container. All
state is either React component state or browser storage.

# Boundaries

Edges counted in the graph between packages:

| From | To | Calls |
| --- | --- | --- |
| `pages` | `components` | 7 |
| `pages` | `router` | 6 |
| `pages` | `store` | 5 |
| `App` | `router` | 1 |

The boundary is strictly one-directional: nothing in `components`, `router` or
`store` imports a page. This is what keeps the three core modules reusable and
is the single most important invariant to preserve when adding screens.

# Render tree

```
index.html #root
  main.jsx -> React root
    App                        reads usePath()
      Signup | Login | Welcome   selected by routes[path], default Signup
        Card
          h1 title
          Field  (per input)
          Message (error text, omitted when empty)
          Link   (cross-page navigation)
```

# Control flow

| Flow | Path |
| --- | --- |
| Navigation | `Link` or page code calls `navigate(path)` -> `history.pushState` + synthetic `popstate` -> `usePath` listener re-renders `App` |
| Signup | `Signup.submit` validates `PASSWORD_RULES`, confirms match, rejects duplicates via `findUser`, then `saveUser` and `navigate('/login')` |
| Login | `Login.submit` looks up via `findUser`, compares the stored password, then `setCurrentUser` and `navigate('/welcome')` |
| Welcome guard | `Welcome` reads `currentUser()`; when absent an effect calls `navigate('/login')` and the component renders `null` |

# Hotspots

Highest fan-in symbols, i.e. the things most expensive to change:

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx` | 4 |
| `Card` | `src/components/Card.jsx` | 3 |
| `findUser` | `src/store.js` | 3 |
| `Link` | `src/router.jsx` | 3 |
| `Message` | `src/components/Card.jsx` | 2 |
| `Field` | `src/components/Card.jsx` | 2 |
| `load` | `src/store.js` | 2 |

# Notable characteristics

* **No route guards except on Welcome.** `/signup` and `/login` are reachable
  while signed in; only [Welcome](/modules/src-pages.md) redirects.
* **Unknown paths fall back to Signup** rather than rendering a 404, because
  `routes[path] ?? Signup` in [src/App](/modules/src-app.md) treats Signup as
  the landing page.
* **Credentials are stored in plaintext** in `localStorage` - see the warning in
  [src/store](/modules/src-store.md). The code is demo-only by construction.
* **The router has no history integration beyond `popstate`.** A real browser
  back navigation works; nested routes, params and query strings do not exist.
