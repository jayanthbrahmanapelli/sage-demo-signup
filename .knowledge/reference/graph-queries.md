---
type: Reference
title: Graph queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/jayanthbrahmanapelli/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, tooling, knowledge-graph]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T14:29:00Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ b5726803264bd97b2b8a57a4ce10fade3b3130f9
    title: Codebase knowledge graph
status: stable
---

# The graph

Stored at `.codebase-memory/graph.db.zst` and served by the
**codebase-memory-mcp** server as project `sage-demo-signup`. If the name is not
found, call `list_projects` and pick the project whose root is this repository.

Prefer these tools over grepping or reading whole files.

# Tools

| Tool | Use for |
| --- | --- |
| `get_architecture` | Counts, packages, entry points, layers, boundaries, clusters, `file_tree` |
| `search_graph` | Finding a symbol by BM25 text, `name_pattern`, `qn_pattern` or `semantic_query` |
| `get_file_outline` | Every declaration in one exact repo-relative path, in source order |
| `get_code_snippet` | The source of a specific symbol |
| `trace_path` | How two symbols are connected |
| `query_graph` | Read-only Cypher for multi-hop questions and aggregation |
| `search_code` | Literals the symbol graph does not carry (CSS classes, strings) |

# Shape of this graph

118 nodes, 174 edges at the indexed commit.

| Labels | Count | | Edge types | Count |
| --- | --- | --- | --- | --- |
| `Variable` | 54 | | `DEFINES` | 92 |
| `Function` | 20 | | `IMPORTS` | 25 |
| `File` | 16 | | `CALLS` | 24 |
| `Module` | 16 | | `CONTAINS_FILE` | 16 |
| `Folder` | 8 | | `USAGE` | 8 |

Qualified names are dotted and rooted at the project:
`sage-demo-signup.src.pages.Signup.submit`.

# Useful queries

Every declaration in `src/`, in file order:

```cypher
MATCH (n) WHERE n.file_path STARTS WITH 'src'
  AND NOT n:File AND NOT n:Folder AND NOT n:Module
RETURN n.file_path AS file, n.name AS name, n.start_line AS line
ORDER BY file, line
```

Everything a given page calls:

```cypher
MATCH (f)-[:CALLS]->(t)
WHERE f.file_path = 'src/pages/Signup.jsx'
RETURN f.name AS caller, t.qualified_name AS callee
```

Fan-in, to find what is expensive to change:

```cypher
MATCH (c)-[:CALLS]->(t)
RETURN t.qualified_name AS symbol, count(c) AS fan_in
ORDER BY fan_in DESC
```

# Gotchas

* The Cypher subset does not support list indexing such as `labels(n)[0]`.
  Return `n.name` / `n.qualified_name` instead.
* `get_file_outline` needs an exact repo-relative path (`src/store.js`, not
  `./src/store.js`).
* CSS class names live in `src/style.css` and are not symbol nodes - reach for
  `search_code` for those.
