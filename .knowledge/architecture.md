---
type: Architecture
title: Application architecture
description: Three-layer client-only app: page components call a hand-rolled router, a localStorage account store and shared Card primitives.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src
tags: [architecture, frontend, react]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T16:23:05Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ a4ccb0fcda14fb892e86dffa67f9cd4f96f04a1e
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
| `pages` | `components` | 10 |
| `pages` | `router` | 8 |
| `pages` | `store` | 7 |
| `App` | `router` | 1 |

The boundary is strictly one-directional: nothing in `components`, `router` or
`store` imports a page. This is what keeps the three core modules reusable and
is the single most important invariant to preserve when adding screens.

The one page-to-page edge is `ResetPassword` importing `PASSWORD_RULES` from
`src/pages/Signup.jsx` - see [src/pages](/modules/src-pages.md). It is a data
import, not a component import, and `Signup` remains unaware of it.

# Render tree

```
index.html #root
  main.jsx -> React root
    App                        reads usePath()
      Signup | Login | Welcome | ResetPassword
                                 selected by routes[path], default Signup
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
| Password reset | `Login` links to `/reset-password`; `ResetPassword.submit` validates the shared `PASSWORD_RULES`, confirms match, requires an existing account via `findUser`, then `saveUser` with the new password and `navigate('/login')` |
| Welcome guard | `Welcome` reads `currentUser()`; when absent an effect calls `navigate('/login')` and the component renders `null` |

# Hotspots

Highest fan-in symbols, i.e. the things most expensive to change:

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx` | 5 |
| `Card` | `src/components/Card.jsx` | 4 |
| `findUser` | `src/store.js` | 4 |
| `Link` | `src/router.jsx` | 4 |
| `Message` | `src/components/Card.jsx` | 3 |
| `Field` | `src/components/Card.jsx` | 3 |
| `saveUser` | `src/store.js` | 2 |
| `load` | `src/store.js` | 2 |

# Notable characteristics

* **No route guards except on Welcome.** `/signup`, `/login` and
  `/reset-password` are reachable while signed in; only
  [Welcome](/modules/src-pages.md) redirects.
* **Password reset is unauthenticated.** `/reset-password` rewrites any
  account's password given only its email - acceptable only because this is a
  demo with no backend; see [src/store](/modules/src-store.md).
* **Unknown paths fall back to Signup** rather than rendering a 404, because
  `routes[path] ?? Signup` in [src/App](/modules/src-app.md) treats Signup as
  the landing page.
* **Credentials are stored in plaintext** in `localStorage` - see the warning in
  [src/store](/modules/src-store.md). The code is demo-only by construction.
* **The router has no history integration beyond `popstate`.** A real browser
  back navigation works; nested routes, params and query strings do not exist.
