---
type: Module
title: pages
description: The `Signup`, `Login` and `Welcome` screens, including the password rule checklist.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms, validation]
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
| `PASSWORD_RULES` | `src/pages/Signup.jsx:6` | Five `{ label, test }` rules defining the password policy |
| `test` | `src/pages/Signup.jsx:11` | The predicate of the last rule (special character) |
| `Signup` | `src/pages/Signup.jsx:14` | Signup form; default export |
| `set` | `src/pages/Signup.jsx:19` | Curried `set(key)` change handler over the single `form` state object |
| `Signup.submit` | `src/pages/Signup.jsx:21` | Validation and account creation |
| `Login` | `src/pages/Login.jsx:6` | Login form; default export |
| `Login.submit` | `src/pages/Login.jsx:11` | Credential check and session start |
| `Welcome` | `src/pages/Welcome.jsx:6` | Signed-in screen; default export |

# Signup

`PASSWORD_RULES` requires: at least 8 characters, one uppercase letter, one
lowercase letter, one number, one special character (`/[^A-Za-z0-9]/`).

State: `form` (`name`, `email`, `password`, `confirm`), `error`, `passwordErrors`.

`submit` runs checks in a fixed order and returns at the first failure:

1. Filter `PASSWORD_RULES` for failing rules, store their labels in
   `passwordErrors`. If any failed, clear `error` and stop.
2. `form.password !== form.confirm` → `'Passwords do not match.'`
3. `findUser(form.email)` truthy → `'An account with this email already exists.'`
4. Otherwise `saveUser({ name: trimmed, email: trimmed, password })` then
   `navigate('/login')`.

Because step 1 clears `error`, password-rule failures and the match/duplicate
messages are never shown at the same time.

Rendering: the full rule list is always visible as `<ul className="rules"
id="password-rules">`, linked from the password input via `aria-describedby`.
Failing rules gain the `error` class, and a `role="alert"` block repeats each
failure as `Password must have: at least …` (the label's leading `At least` is
lowercased with `label.replace(/^At least /, 'at least ')`).

# Login

Two separate `useState` fields plus `error`. `submit` calls `findUser(email)` and
compares `user.password !== password`; either miss yields the single message
`'Email or password is incorrect.'` — the same text for unknown email and wrong
password, so the form does not reveal which accounts exist. On success it calls
`setCurrentUser(user.email)` and `navigate('/welcome')`.

# Welcome

Reads `currentUser()` on every render. A `useEffect` keyed on `user` calls
`navigate('/login')` when there is no session, and the component returns `null`
in that render. The title is `` `Welcome, ${user.name || user.email}` ``, falling
back to the email when no name was given. The "Log out" link only navigates to
`/login`; it does not clear `sessionStorage`.

# Depends on

* [components](/modules/components.md) for `Card`, `Field`, `Message`.
* [router](/modules/router.md) for `Link` and `navigate`.
* [store](/modules/store.md) for `findUser`, `saveUser`, `setCurrentUser`, `currentUser`.

Routed by [App](/modules/app.md).
