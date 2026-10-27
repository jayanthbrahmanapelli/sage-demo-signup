---
type: Module
title: components
description: Presentational primitives `Card`, `Field` and `Message` shared by all pages.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/src/components
tags: [frontend, ui, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T13:55:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ dd9860e46d77fc36d1722c60a534cdacd34753de
    title: Codebase knowledge graph
status: stable
---

# Symbols

All three live in `src/components/Card.jsx` and are named exports.

| Symbol | Location | Props | Renders |
| --- | --- | --- | --- |
| `Card` | `src/components/Card.jsx:1` | `title`, `children` | `<main className="card">` with an `<h1>{title}</h1>` |
| `Field` | `src/components/Card.jsx:10` | `label`, plus any input props | `<label className="field">` wrapping `<span>` and `<input {...input} />` |
| `Message` | `src/components/Card.jsx:19` | `kind = 'error'`, `children` | `<p className={"message " + kind}>`, or `null` when empty |

# Notes

* `Field` forwards every prop other than `label` to the native input, which is how
  pages set `type`, `autoComplete`, `required` and `aria-describedby`.
* `Message` picks its ARIA role from `kind`: `role="alert"` for `error`,
  `role="status"` otherwise. Only `error` is used today.
* `Message` returning `null` for falsy children lets pages render
  `<Message>{error}</Message>` unconditionally.
* `Card` is a page-level landmark (`<main>`), so exactly one should be rendered
  per screen.

# Relationships

* Zero outbound calls; this is a leaf of the dependency graph.
* Rendered by all three screens in [pages](/modules/pages.md) — 7 calls across
  the `pages` → `components` boundary.
