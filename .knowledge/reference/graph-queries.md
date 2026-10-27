---
type: Reference
title: Graph Queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, tooling, knowledge-graph]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T13:55:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ dd9860e46d77fc36d1722c60a534cdacd34753de
    title: Codebase knowledge graph
status: stable
---

# Access

The graph lives in `.codebase-memory/graph.db.zst` and is served by the
`codebase-memory-mcp` MCP server as project **`sage-demo-signup`**. If the name
does not resolve, call `list_projects` and pick the project whose root is this
repository.

# Tools, in order of preference

| Tool | Use for |
| --- | --- |
| `get_architecture` | Layers, boundaries, clusters, hotspots, entry points, file tree. `aspects: ["all"]` returns everything. |
| `search_graph` | Finding a symbol by name, qualified name, BM25 `query` or `semantic_query`; add `include_connected` for neighbours. |
| `get_file_outline` | Declarations of one exact repo-relative file, in source order. |
| `get_code_snippet` | The source of a symbol once you know it. |
| `trace_path` | Relationship chains between two symbols. |
| `query_graph` | Multi-hop Cypher, aggregation, anything the above cannot express. |

Prefer these over grep or reading whole files; fall back to `search_code` only
for string literals and coverage gaps.

# Graph shape at this commit

119 nodes, 174 edges.

| Node label | Count |
| --- | --- |
| `Variable` | 55 |
| `Function` | 20 |
| `File` | 16 |
| `Module` | 16 |
| `Folder` | 8 |
| `Section` | 2 |
| `Branch` | 1 |
| `Project` | 1 |

| Edge type | Count |
| --- | --- |
| `DEFINES` | 93 |
| `IMPORTS` | 25 |
| `CALLS` | 24 |
| `CONTAINS_FILE` | 16 |
| `USAGE` | 8 |
| `CONTAINS_FOLDER` | 6 |
| `CONFIGURES` | 1 |
| `HAS_BRANCH` | 1 |

Qualified names are dotted paths rooted at the project, e.g.
`sage-demo-signup.src.pages.Signup.submit`.

Note that `Variable` nodes include YAML and JSON keys from
`.github/workflows/ui-correction.yml`, `.ui-gen/corrections/` and
`.sage-maintenance/` — filter on `file_path` starting with `src/` when you only
want application code.

# Useful queries

List every function with its location:

```cypher
MATCH (n:Function)
RETURN n.qualified_name AS qn, n.file_path AS file, n.start_line AS line
ORDER BY file, line
```

Application variables only:

```cypher
MATCH (n:Variable)
WHERE n.file_path STARTS WITH 'src/'
RETURN n.qualified_name AS qn, n.file_path AS file, n.start_line AS line
ORDER BY file, line
```

What calls a given symbol:

```cypher
MATCH (caller)-[:CALLS]->(callee)
WHERE callee.name = 'navigate'
RETURN caller.qualified_name AS caller, caller.file_path AS file
```

# Caveats

* `labels(n)[0]` is not parseable by this Cypher dialect — match on a label
  directly (`MATCH (n:Function)`) instead.
* `start_line` comes back as a string, not a number.
* `get_architecture` reports no `routes`: this app has no HTTP routes, only the
  client-side `routes` object literal in `src/App.jsx:7`.
* `query_graph` paginates at 200 visible rows by default; continue with
  `next_cursor`.
