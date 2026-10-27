---
type: Convention
title: Conventions
description: Coding conventions for pages, routing, state and the demo-only persistence layer.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src
tags: [conventions, react, frontend]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T13:55:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ dd9860e46d77fc36d1722c60a534cdacd34753de
    title: Codebase knowledge graph
status: stable
---

# Files and naming

| Rule | Evidence |
| --- | --- |
| ES modules only (`"type": "module"` in `package.json`) | all sources use `import`/`export` |
| Components live in `.jsx`, plain logic in `.js` | `src/store.js` is the only `.js` source |
| Imports carry their extension | `./App.jsx`, `../store.js` |
| One page component per file in `src/pages/`, `PascalCase`, `export default` | `Signup`, `Login`, `Welcome` |
| A page's path is its kebab-cased file name | the comment above `routes` in `src/App.jsx:6` |
| Shared primitives are **named** exports | `Card`, `Field`, `Message` in `src/components/Card.jsx` |

# Components

* Function components only; no classes exist in the graph.
* Hooks come from `react` directly (`useState`, `useEffect`) — no custom hook
  beyond `usePath` in [router](/modules/router.md).
* `Field` spreads its remaining props onto the native `<input>`
  (`src/components/Card.jsx:10`), so pages pass `type`, `autoComplete`, `required`
  and `aria-describedby` straight through.
* Styling is `className` strings against `src/style.css`; no CSS modules, no
  inline style objects.

# Forms

* Every form sets `noValidate` and handles validation in JS, so the browser's
  native bubbles never appear.
* The submit handler is a local function named `submit` that calls
  `event.preventDefault()` first.
* Form state is one `useState` object in `Signup` (with a curried
  `set(key)` updater at `src/pages/Signup.jsx:19`) and separate `useState` calls
  per field in `Login`. Both styles are in use; follow the file you are editing.
* Validation failures are surfaced through `Message`, which renders
  `role="alert"` for `kind === 'error'` and `role="status"` otherwise, and
  renders nothing when its children are empty.

# State and persistence

* No global state container; the only cross-page state is in
  [store](/modules/store.md).
* Emails are the account key and are always normalised with
  `.trim().toLowerCase()` before lookup or write.
* `load` in `src/store.js:4` wraps `JSON.parse` in `try`/`catch` and falls back to
  `{}` — storage is always treated as untrusted.
* Anything written to storage is demo data. Do not extend this layer toward real
  credential handling.

# Accessibility

* Inputs are always wrapped by `Field`, which pairs a `<span>` label with the
  control inside a `<label>`.
* Dynamic error regions use `role="alert"`; the password checklist is linked to
  its input with `aria-describedby="password-rules"`.
