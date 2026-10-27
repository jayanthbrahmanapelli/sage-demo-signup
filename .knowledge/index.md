---
okf_version: "0.2"
---

# Start Here

* [Codebase Overview](/overview.md) - Vite + React single-page demo for account signup, login, password reset and a welcome screen, backed by browser storage.
* [Architecture](/architecture.md) - Three-layer client-only app: page components call a hand-rolled router, a localStorage account store and shared Card primitives.
* [Conventions](/conventions.md) - Conventions for routing, page components, form state and the demo-only storage layer.

# Modules

* [src/App](/modules/src-app.md) - Root component that maps the current path to one of the four page components.
* [src/router](/modules/src-router.md) - Minimal history-API router providing navigate, usePath and Link.
* [src/store](/modules/src-store.md) - Demo-only account persistence over localStorage and sessionStorage.
* [src/components](/modules/src-components.md) - Shared presentational primitives: Card, Field and Message.
* [src/pages](/modules/src-pages.md) - The four routed screens: Signup, Login, ResetPassword and Welcome.
* [src/main](/modules/src-main.md) - Browser entry point that mounts App into #root and loads the stylesheet.

# Playbooks

* [Common Tasks](/playbooks/common-tasks.md) - Where to go to change routing, password rules, form fields, styling or stored account data.

# Reference

* [Graph Queries](/reference/graph-queries.md) - How to query the live codebase knowledge graph for this project.

# History

* [Knowledge Update Log](/log.md)
