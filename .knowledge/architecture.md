---
type: Architecture
title: Architecture
description: Four source packages layered as entry pages over a shared router, localStorage store and presentational card primitives.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src
tags: [architecture, frontend, react]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T13:55:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ dd9860e46d77fc36d1722c60a534cdacd34753de
    title: Codebase knowledge graph
status: stable
---

# Layers

| Package | Layer | Reason (from the graph) |
| --- | --- | --- |
| `App` | entry | has entry points, only outbound calls |
| `pages` | entry | has entry points, only outbound calls |
| `components` | core | high fan-in (7 in, 0 out) |
| `router` | core | high fan-in (7 in, 0 out) |
| `store` | core | high fan-in (5 in, 0 out) |

The three core packages have **no outbound calls at all**. Dependencies flow in a
single direction, entry → core, with no cycles in the graph.

# Boundaries

| From | To | Calls |
| --- | --- | --- |
| `pages` | `components` | 7 |
| `pages` | `router` | 6 |
| `pages` | `store` | 5 |
| `App` | `router` | 1 |

# Render tree

```
index.html  →  src/main.jsx  →  App                       (src/App.jsx:13)
                                 └─ usePath()             (src/router.jsx:9)
                                 └─ routes[path] ?? Signup (src/App.jsx:7)
                                      ├─ Signup           (src/pages/Signup.jsx:14)
                                      ├─ Login            (src/pages/Login.jsx:6)
                                      └─ Welcome          (src/pages/Welcome.jsx:6)
                                           each rendering Card / Field / Message
                                           (src/components/Card.jsx:1, :10, :19)
```

# Navigation flow

| Trigger | Call | Destination |
| --- | --- | --- |
| `Signup.submit` succeeds | `saveUser` then `navigate('/login')` | `/login` |
| `Login.submit` succeeds | `setCurrentUser` then `navigate('/welcome')` | `/welcome` |
| `Welcome` with no `currentUser()` | `navigate('/login')` in `useEffect` | `/login` |
| `Link` click | `navigate(to)` | the `to` path |

`navigate` pushes history state and dispatches a synthetic `popstate`, which the
`usePath` listener picks up; see [router](/modules/router.md).

# Hotspots

| Symbol | Fan-in |
| --- | --- |
| `navigate` (`src/router.jsx:4`) | 4 |
| `Card` (`src/components/Card.jsx:1`) | 3 |
| `findUser` (`src/store.js:12`) | 3 |
| `Link` (`src/router.jsx:19`) | 3 |
| `Message` (`src/components/Card.jsx:19`) | 2 |
| `Field` (`src/components/Card.jsx:10`) | 2 |
| `load` (`src/store.js:4`) | 2 |

# Clusters

| Members | Cohesion |
| --- | --- |
| `navigate`, `findUser`, `Welcome`, `submit`, `currentUser` | 0.50 |
| `Link`, `Signup`, `Login`, `Card`, `Field` | 0.73 |
| `submit`, `load`, `saveUser`, `test` | 0.50 |
| `usePath`, `App` | 1.00 |

# Notable constraints

* **No backend and no routes graph** - there are no HTTP routes; `routes` in
  `src/App.jsx` is a plain object literal, so any route change is a code change.
* **Credentials are stored in plaintext** - `saveUser` writes the raw password
  into `localStorage`. This is acceptable only because the app is a demo; see
  [store](/modules/store.md).
* **No shared validation layer** - password policy lives in `PASSWORD_RULES`
  inside `src/pages/Signup.jsx`, not in a core package.
