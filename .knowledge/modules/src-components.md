---
type: Module
title: src/components
description: Shared presentational primitives: Card, Field and Message.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/components
tags: [frontend, components, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T14:29:00Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ b5726803264bd97b2b8a57a4ce10fade3b3130f9
    title: Codebase knowledge graph
status: stable
---

# Role

`src/components/Card.jsx` holds every shared UI primitive in the app. All three
are purely presentational - no state, no storage, no navigation.

# Contents

| Symbol | Lines | Props | Renders |
| --- | --- | --- | --- |
| `Card` | 1 | `{ title, children }` | `<main className="card">` with an `<h1>{title}</h1>` |
| `Field` | 10 | `{ label, ...input }` | `<label className="field">` wrapping `<span>{label}</span>` and `<input {...input} />` |
| `Message` | 19 | `{ kind = 'error', children }` | `<p className={"message " + kind}>`, or `null` when children are empty |

# Accessibility behaviour

* `Field` wraps its own `<input>`, so the label is associated without an `id`.
  Everything other than `label` is spread onto the input, which is how pages
  pass `type`, `autoComplete`, `required` and `aria-describedby`.
* `Message` sets `role="alert"` for `kind="error"` and `role="status"`
  otherwise, so error text is announced immediately.
* `Message` returning `null` for empty children is why pages set the error
  state to `''` instead of conditionally rendering - see
  [Conventions](/conventions.md).

# Dependencies

* No imports at all.
* Consumed by every page in [src/pages](/modules/src-pages.md); `Card` has
  fan-in 3, `Field` and `Message` fan-in 2 each.
