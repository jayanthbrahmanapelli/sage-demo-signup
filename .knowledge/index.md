---
okf_version: "0.2"
---

# Codebase Knowledge: sage-demo-signup

* [Codebase Overview](/overview.md) - A three-page React + Vite demo for account signup, login and a signed-in welcome screen, with no backend.
* [Architecture](/architecture.md) - Four source packages layered as entry pages over a shared router, localStorage store and presentational card primitives.
* [Conventions](/conventions.md) - Coding conventions for pages, routing, state and the demo-only persistence layer.

# Modules

* [Modules Index](/modules/index.md) - One concept per source directory in `src/`.
* [App](/modules/app.md) - Root component and bootstrap that map `location.pathname` to a page component.
* [router](/modules/router.md) - Hand-rolled History API router providing `navigate`, `usePath` and `Link`.
* [store](/modules/store.md) - Demo-only account persistence over `localStorage` and `sessionStorage`.
* [components](/modules/components.md) - Presentational primitives `Card`, `Field` and `Message` shared by all pages.
* [pages](/modules/pages.md) - The `Signup`, `Login` and `Welcome` screens, including the password rule checklist.

# Playbooks

* [Common Tasks](/playbooks/common-tasks.md) - Where to go to change a page, a route, a validation rule or the stored user shape.

# Reference

* [Graph Queries](/reference/graph-queries.md) - How to query the live codebase knowledge graph for this project.
