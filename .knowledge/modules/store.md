---
type: Module
title: store
description: Demo-only account persistence over `localStorage` and `sessionStorage`.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, core]
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
| `KEY` | `src/store.js:2` | `'acme-users'`, the `localStorage` key holding all accounts |
| `load` | `src/store.js:4` | Private; parses `KEY` as JSON, returning `{}` on absence or parse failure |
| `findUser` | `src/store.js:12` | Look up one account by normalised email, else `null` |
| `saveUser` | `src/store.js:16` | Insert or overwrite an account keyed by normalised email |
| `setCurrentUser` | `src/store.js:22` | Write the active email to `sessionStorage` under `'acme-current'` |
| `currentUser` | `src/store.js:26` | Resolve `'acme-current'` back to an account via `findUser`, else `null` |

# Storage shape

```
localStorage['acme-users']   = { "<email lowercased>": { name, email, password }, ... }
sessionStorage['acme-current'] = "<email>"
```

`findUser` and `saveUser` both normalise with `.trim().toLowerCase()`, so the map
key is always lowercased while the stored `email` field keeps the user's own
casing.

# Session semantics

Accounts persist in `localStorage` across browser sessions; the signed-in user
lives in `sessionStorage`, so closing the tab signs out without deleting the
account.

# Caveats

* **Plaintext passwords.** `saveUser` stores `password` as given. The file's own
  header comment marks this as demo-only; do not reuse this module as a template
  for real authentication.
* `load` is not exported — callers cannot enumerate accounts.
* No delete or update path exists; `saveUser` overwrites by key.

# Consumed by

[pages](/modules/pages.md) only — `Signup` calls `findUser`/`saveUser`, `Login`
calls `findUser`/`setCurrentUser`, `Welcome` calls `currentUser`.
