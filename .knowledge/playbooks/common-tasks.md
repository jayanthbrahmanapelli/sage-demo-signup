---
type: Playbook
title: Common Tasks
description: Where to go to change a page, a route, a validation rule or the stored user shape.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src
tags: [playbook, frontend]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T13:55:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ dd9860e46d77fc36d1722c60a534cdacd34753de
    title: Codebase knowledge graph
status: stable
---

# To change X, go to Y

| Task | Where | Notes |
| --- | --- | --- |
| Change the password policy | `PASSWORD_RULES`, `src/pages/Signup.jsx:6` | Add a `{ label, test }` entry. The checklist, the error list and `submit` all derive from this array — nothing else needs editing. |
| Reword a password rule | the rule's `label` | `label` is the React `key`, the checklist text and the error text. The error prefix strips `At least ` (`src/pages/Signup.jsx`), so keep that wording or adjust the `replace`. |
| Change signup validation order or messages | `Signup.submit`, `src/pages/Signup.jsx:21` | Each check returns early; step 1 clears `error`, so reordering changes which message a user sees. |
| Change login failure text | `Login.submit`, `src/pages/Login.jsx:11` | One message covers both unknown-email and wrong-password on purpose — do not split it. |
| Add a page | new file in `src/pages/`, then add an entry to `routes` (`src/App.jsx:7`) | Name the file `PascalCase.jsx`, `export default`, and use the kebab-cased name as the path. |
| Change the fallback for unknown paths | `routes[path] ?? Signup`, `src/App.jsx:13` | |
| Add a link between pages | `Link` from `src/router.jsx:19` | Never use a bare `<a>`; it triggers a full page load. |
| Navigate from code | `navigate` from `src/router.jsx:4` | Never call `history.pushState` directly — only `navigate` fires the `popstate` that `usePath` listens for. |
| Change what an account stores | `saveUser`/`findUser`, `src/store.js:16` and `:12` | Existing `localStorage['acme-users']` entries keep the old shape; read defensively or bump `KEY` (`src/store.js:2`). |
| Implement real log out | `Welcome`, `src/pages/Welcome.jsx` | Today's "Log out" link only navigates; `sessionStorage['acme-current']` is untouched. A `clearCurrentUser` would belong in `src/store.js`. |
| Add a new input to a form | `Field` from `src/components/Card.jsx:10` | Extra props are spread onto the native `<input>`. |
| Add a non-error banner | `Message` with `kind="success"`, `src/components/Card.jsx:19` | Non-`error` kinds render `role="status"`; add a matching `.message.<kind>` rule in `src/style.css`. |
| Restyle anything | `src/style.css` | Single stylesheet, imported once from `src/main.jsx`. Selectors follow the `className` strings: `card`, `field`, `message`, `rules`, `rule`, `switch`. |
| Run or build the app | `npm run dev` / `npm run build` / `npm run preview` | See [Codebase Overview](/overview.md). |

# Gotchas

* Both form-state styles exist (`Signup` uses one object, `Login` uses per-field
  state). Match the file you are editing rather than unifying them casually.
* All forms are `noValidate`; adding an HTML-only constraint such as `minLength`
  will not block submission on its own.
* `Welcome` renders `null` for one frame before the redirect effect runs — keep
  that guard if you add content.

See [Conventions](/conventions.md) for the rules these tasks must respect.
