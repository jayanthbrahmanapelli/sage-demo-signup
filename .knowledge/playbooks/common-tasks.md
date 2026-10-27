---
type: Playbook
title: Common tasks
description: Where to go to change routing, password rules, form fields, styling or stored account data.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src
tags: [playbook, howto]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T16:23:05Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ a4ccb0fcda14fb892e86dffa67f9cd4f96f04a1e
    title: Codebase knowledge graph
status: stable
---

# Quick map

| To change... | Go to |
| --- | --- |
| Which page a URL shows | `routes` in `src/App.jsx` (line 8) |
| Password requirements (both signup **and** reset) | `PASSWORD_RULES` in `src/pages/Signup.jsx` (line 6) |
| Signup validation order or messages | `submit` in `src/pages/Signup.jsx` (line 21) |
| Login error wording | `submit` in `src/pages/Login.jsx` (line 11) |
| The "Forgot password?" link | `<p className="switch forgot">` in `src/pages/Login.jsx` (line 27) |
| Password-reset flow or messages | `submit` in `src/pages/ResetPassword.jsx` (line 14) |
| The signed-in screen or its guard | `src/pages/Welcome.jsx` |
| Any input's markup or ARIA | `Field` in `src/components/Card.jsx` (line 10) |
| Error/success banner behaviour | `Message` in `src/components/Card.jsx` (line 19) |
| How navigation works | `navigate` / `usePath` / `Link` in `src/router.jsx` |
| Where accounts are stored | `src/store.js` |
| Any visual styling | `src/style.css` |
| Document title or favicon | `index.html` |

# Add a page

1. Create `src/pages/<Name>.jsx` with a default-exported component whose root is
   a `Card`, following [Conventions](/conventions.md).
2. Import it in `src/App.jsx` and add a `'/path': <Name>` entry to `routes`.
3. Link to it with `<Link to="/path">` from wherever it should be reachable;
   navigate programmatically with `navigate('/path')`.

Remember the layer rule from [Architecture](/architecture.md): the new page may
import from `components`, `router` and `store`, but none of those may import it.

# Add or change a password rule

Edit `PASSWORD_RULES` in `src/pages/Signup.jsx`. Each entry needs all four
fields:

```js
{ id: 'unique-id', label: 'Neutral requirement text', error: 'Message when it fails.', test: (value) => boolean }
```

`id` must be unique - it is both the React `key` and the value tracked in
`failedRules`. The list renders and validates straight from this array, so no
other file changes - `ResetPassword` imports the same export and picks the
change up automatically. Style failures via `.rule.failed` in `src/style.css`.

# Add a field to a form

Add the key to the `form` object passed to `useState` in `Signup` or
`ResetPassword` (or a new
`useState` in `Login`), render a `<Field>` wired to `set('<key>')`, and add any
validation inside `submit` before the `saveUser` call. Pass input attributes
directly to `Field` - they are spread onto the `<input>`.

# Change how accounts are stored

Everything is behind the four exports in `src/store.js`
(`findUser`, `saveUser`, `setCurrentUser`, `currentUser`). Keep those
signatures and the pages need no changes. Note `findUser` and `saveUser`
normalise the email key with `.trim().toLowerCase()`; any replacement must keep
that or existing accounts become unreachable.

# Make the password reset safer

Today `src/pages/ResetPassword.jsx` rewrites a password given only an email, and
it reveals whether an account exists. To change that, edit `submit`:

* To stop disclosing registration, drop the `!user` early return and navigate
  regardless - mirror the shared wording used by `Login.submit`.
* To require proof, add a step between the email lookup and `saveUser`; any new
  persistence must go through [src/store](/modules/src-store.md) rather than
  touching `localStorage` directly.

# Inspect or reset local data

In the browser console:

```js
JSON.parse(localStorage.getItem('acme-users'))   // all accounts
sessionStorage.getItem('acme-current')           // signed-in email
localStorage.removeItem('acme-users'); sessionStorage.clear()   // reset
```

# Run it

`npm run dev` for the Vite dev server, `npm run build` then `npm run preview`
to check the production bundle. `@playwright/test` is installed as a dev
dependency but there is no test script or spec file in the repository yet.
