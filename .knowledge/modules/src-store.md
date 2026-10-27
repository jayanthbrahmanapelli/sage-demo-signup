---
type: Module
title: src/store
description: Demo-only account persistence over localStorage and sessionStorage.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/store.js
tags: [frontend, storage, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T16:23:05Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ a4ccb0fcda14fb892e86dffa67f9cd4f96f04a1e
    title: Codebase knowledge graph
status: stable
---

# Role

The whole persistence layer. Accounts are an email-keyed object in
`localStorage`; the signed-in user is one email in `sessionStorage`.

> The file opens with the comment *"Demo-only account store in localStorage.
> Not for real credentials."* Passwords are stored in plaintext. Treat any
> change here as demo scaffolding, not as an auth implementation.

# Contents

| Symbol | Lines | Signature | Notes |
| --- | --- | --- | --- |
| `KEY` | 2 | `'acme-users'` | localStorage key for the account map |
| `load` | 4 | `() => object` | Module-private; `JSON.parse` wrapped in try/catch, returns `{}` on failure |
| `findUser` | 12 | `(email) => user \| null` | Normalises with `.trim().toLowerCase()` |
| `saveUser` | 16 | `(user) => void` | Read-modify-write of the whole map, same normalised key |
| `setCurrentUser` | 22 | `(email) => void` | Writes `sessionStorage['acme-current']` |
| `currentUser` | 26 | `() => user \| null` | Resolves the session email through `findUser` |

A stored user record is `{ name, email, password }`, written by
`Signup.submit` with `name` and `email` trimmed.

# Dependencies

* No imports. Browser globals only.
* Called by [src/pages](/modules/src-pages.md): `Signup` (`findUser`,
  `saveUser`), `Login` (`findUser`, `setCurrentUser`), `ResetPassword`
  (`findUser`, `saveUser`), `Welcome` (`currentUser`).

# Notes

* Two storage scopes on purpose: accounts survive a browser restart,
  the session does not.
* `saveUser` overwrites an existing entry silently - duplicate rejection is the
  caller's job and lives in `Signup.submit`. `ResetPassword.submit` relies on
  the same overwrite, passing `{ ...user, password }` so the rest of the record
  survives.
* The session key `'acme-current'` is an inline literal, unlike `KEY`.
