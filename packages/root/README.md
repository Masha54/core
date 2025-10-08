# @ooopsstudio/root

Source of truth for **contracts**, **ports**, **tokens**, and tiny **utilities** used across the Ooops Studio monorepo. This package is intentionally boring: no runtime side effects, no presets, no adapters. It exists to keep service packages decoupled and typed without importing each other.

> Import **subpaths only**. The root index export is disabled on purpose to discourage barrel imports.

---

## Design Goals

- Framework‑agnostic, tree‑shakeable types and micro‑helpers
- Stable, semver‑governed public API (ports and tokens)
- Zero side effects at import time
- No logging, no timers, no I/O
- Small surface area that services can depend on safely

---

## What lives here

- **Contracts** (pure TypeScript interfaces/types)
- **Ports** (shared DI boundaries)
- **Tokens** (DI keys; stable identifiers)
- **Utils** (tiny, pure helpers; type‑level only)
- **Testing helpers** (for consumer tests and examples)

Everything above is side‑effect free and safe to import from any package in the monorepo.

---

## Installation

```bash
pnpm add @ooopsstudio/root
```

> This package is meant to be a **compile‑time** and **type‑level** dependency for other Ooops packages. You should not ship runtime logic from here.

---

## Importing (subpaths only)

The root index export is intentionally disabled. Import using **explicit subpaths**:

```ts
// Contracts
import type { Clock } from '@ooopsstudio/root/contracts/clock'

// Ports
import type { SecurityRedaction } from '@ooopsstudio/root/ports/security'

// Tokens
import { TOK } from '@ooopsstudio/root/tokens'

// Utils
import { isErrorLike } from '@ooopsstudio/root/utils/guards'
```

If you see `import '@ooopsstudio/root'` in code reviews, that’s a violation of the contract. Fix the import.

---

## Quick examples

---

## Package structure

```
src/
  contracts/
    clock.ts
    logging.ts
    recent-events.ts
    sink.ts
  ports/
    security.ts
    transport.ts
  tokens/
    index.ts
  utils/
    guards.ts
    types.ts
  testing/
    fakes.ts
```

- **No runtime logic** beyond token creation and pure guards.
- **No side effects** at import.
- **No service imports** here. This package must not depend on any other Ooops package.

---

## Public API and SemVer

- **Ports and tokens are public API.** Renaming or removing them is a **major** change.
- Types in `contracts/*` are part of the stability promise; additive fields are **minor**, breaking field changes are **major**.
- The export map exposes only subpaths to keep usage explicit and tree‑shakeable.

---

## Contributing

- Follow the documentation policy (every file has a `@file` block; every exported symbol has JSDoc and examples).
- No `any` types. Use `unknown` plus guards if needed.
- Keep diffs small; prefer additive changes in separate PRs.
- Update tests and run the workspace validation pipeline before pushing.

---

## License

MIT © Ooops Design Studio
