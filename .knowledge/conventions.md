---
type: Convention
title: Project conventions
description: Conventions for routing, page components, form state and the demo-only storage layer.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src
tags: [conventions, react, frontend]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T16:23:05Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ a4ccb0fcda14fb892e86dffa67f9cd4f96f04a1e
    title: Codebase knowledge graph
status: stable
---

# Modules and imports

* ESM only; **every relative import carries its file extension** (`'./App.jsx'`,
  `'../store.js'`). Extensionless imports are not used anywhere.
* Pages use `export default`; shared helpers (`Card`, `Field`, `Message`,
  `navigate`, `usePath`, `Link`, and everything in `store.js`) use named exports.
* `src/store.js` is plain `.js`; every file containing JSX is `.jsx`.

# Pages

* One page per file in `src/pages/`, the component named after the file
  (`Signup.jsx` -> `Signup`). Registered in the `routes` object in
  `src/App.jsx` under the kebab-cased file name (`ResetPassword.jsx` ->
  `/reset-password`) - see [src/App](/modules/src-app.md).
* A page always renders a single [`Card`](/modules/src-components.md) as its
  root, with a `title` prop and the form or content as children.
* The cross-page prompt at the bottom of a page is a `<p className="switch">`
  containing a `Link`. An in-form secondary link uses the same element with a
  modifier class - `<p className="switch forgot">` in `Login`.

# Forms

* `<form onSubmit={submit} noValidate>` - native validation is suppressed and
  all checks live in the `submit` handler, so messages are controlled by the app.
* Every input is a [`Field`](/modules/src-components.md); `Field` spreads all
  props other than `label` straight onto the `<input>`, so `type`,
  `autoComplete`, `required` and ARIA attributes are passed through.
* Errors are surfaced through a single `<Message>`; it renders nothing when its
  children are empty, so pages set `''` rather than conditionally rendering.
* Multi-field state uses one `useState` object plus a curried setter
  (`set('email')`, in `Signup`); single-field pages use separate `useState`
  calls (`Login`).

# Validation messaging

`Signup` keeps a per-rule list (`PASSWORD_RULES`) where each entry holds both a
neutral `label` and an `error` string. The rules list is always visible and a
failing rule swaps its `label` for its `error` with the `failed` class. When any
rule fails, the generic `error` message is cleared so the two channels never
compete. Follow this pattern for any further rule-based validation.

`PASSWORD_RULES` is a **named export of `src/pages/Signup.jsx`** and is the
single source of password policy; `ResetPassword` imports it rather than
restating the rules. Any page that accepts a new password must import it, never
copy it.

# Styling

* One global stylesheet, `src/style.css`, imported once from `src/main.jsx`.
* Class names are semantic and lowercase: `card`, `field`, `message`,
  `message error`, `message ok`, `switch`, `switch forgot`, `rules`, `rule`,
  `rule failed`.
  There is no CSS-module or utility-class convention.

# Storage

* All browser-storage access goes through `src/store.js`; pages never touch
  `localStorage` or `sessionStorage` directly.
* Emails are the account key and are normalised with `.trim().toLowerCase()`
  inside the store, so callers may pass raw input.
* Storage reads are defensive: `load()` swallows parse errors and returns `{}`.
