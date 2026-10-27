---
type: Module
title: src/pages
description: The four routed screens: Signup, Login, ResetPassword and Welcome.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T16:23:05Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ a4ccb0fcda14fb892e86dffa67f9cd4f96f04a1e
    title: Codebase knowledge graph
status: stable
---

# Role

One default-exported component per file, each mapped to a path by the `routes`
table in [src/App](/modules/src-app.md). Pages are the only layer that holds
state or calls [src/store](/modules/src-store.md) and
[src/router](/modules/src-router.md).

| File | Component | Path |
| --- | --- | --- |
| `src/pages/Signup.jsx` | `Signup` | `/signup` (also the fallback for unknown paths) |
| `src/pages/Login.jsx` | `Login` | `/login` |
| `src/pages/Welcome.jsx` | `Welcome` | `/welcome` |
| `src/pages/ResetPassword.jsx` | `ResetPassword` | `/reset-password` |

# Signup

| Symbol | Lines | Notes |
| --- | --- | --- |
| `PASSWORD_RULES` | 6 | Five rules, each `{ id, label, error, test }`; **named export**, also consumed by `ResetPassword` |
| `Signup` | 14 | State: `form` (`name`, `email`, `password`, `confirm`), `error`, `failedRules` |
| `set` | 19 | Curried setter, `set('email')` returns an onChange handler |
| `submit` | 21 | Validation pipeline, then persist and navigate |
| `test` | 11 | The predicate property on each rule entry |

The five rules are: at least 8 characters, an uppercase letter, a lowercase
letter, a number, and a special character (`/[^A-Za-z0-9]/`).

`submit` runs in a fixed order:

1. Evaluate every rule; store the failing ids in `failedRules`. If any fail,
   clear the generic `error` and stop.
2. `form.password !== form.confirm` -> *"Passwords do not match."*
3. `findUser(form.email)` -> *"An account with this email already exists."*
4. `saveUser({ name, email, password })` with `name` and `email` trimmed, then
   `navigate('/login')`.

The rules render as a permanently visible `<ul className="rules"
id="password-rules">`, referenced by the password input's `aria-describedby`.
Each `<li>` shows the neutral `label`, or the `error` text with class
`rule failed` once that rule has failed a submit.

# Login

`submit` (line 11) calls `findUser(email)` and compares `user.password`. A
missing user and a wrong password share one message, *"Email or password is
incorrect."*, so the form does not disclose which emails are registered. On
success it calls `setCurrentUser(user.email)` - the stored, normalised email,
not the raw input - and navigates to `/welcome`. State is two separate
`useState` calls rather than a form object.

Between the password input and the `<Message>` sits a
`<p className="switch forgot">` holding a `Link` to `/reset-password`
("Forgot password?"). It is inside the `<form>`, so it stays visually attached
to the credentials rather than to the bottom "New here?" prompt.

# ResetPassword

| Symbol | Lines | Notes |
| --- | --- | --- |
| `ResetPassword` | 7 | State: `form` (`email`, `password`, `confirm`), `error`, `failedRules` |
| `set` | 12 | Curried setter, same shape as `Signup`'s |
| `submit` | 14 | Validation pipeline, then rewrite the password and navigate |

Imports `PASSWORD_RULES` from `./Signup.jsx` and renders the same always-visible
`<ul className="rules" id="password-rules">`, so the policy and its wording stay
in one place.

`submit` runs in a fixed order:

1. Evaluate every rule; store failing ids in `failedRules`. If any fail, clear
   the generic `error` and stop.
2. `form.password !== form.confirm` -> *"Passwords do not match."*
3. `findUser(form.email)` returns nothing -> *"No account was found with this
   email."*
4. `saveUser({ ...user, password: form.password })` - spreading the stored
   record preserves `name` and the normalised `email` - then `navigate('/login')`.

Unlike `Login`, this page **does** disclose whether an email is registered
(step 3). There is no token, no email round-trip and no session requirement: the
reset is immediate. The bottom prompt is "Remembered it? Log in".

# Welcome

Reads `currentUser()` during render. When there is no session an effect calls
`navigate('/login')` and the component returns `null`, so nothing flashes. The
title is `` `Welcome, ${user.name || user.email}` ``, falling back to the email
when no name was stored. "Log out" is a plain `Link` to `/login` - it navigates
but does **not** clear `sessionStorage`, so the session survives it.

# Dependencies

All four pages import `Card` (and `Field`/`Message` except `Welcome`) from
[src/components](/modules/src-components.md), `Link`/`navigate` from
[src/router](/modules/src-router.md), and their store functions from
[src/store](/modules/src-store.md). Nothing imports a page except
[src/App](/modules/src-app.md) and `ResetPassword`, which imports only the
`PASSWORD_RULES` data from `Signup.jsx` - see the boundary note in
[Architecture](/architecture.md).
