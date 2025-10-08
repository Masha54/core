# Ooops Studio Monorepo

Framework‑agnostic infrastructure libraries for production‑grade web apps. This repository houses small, composable packages with strict dependency boundaries, deterministic tests, and zero side effects at import. Packages are designed to be used in React/Next.js or Svelte/SvelteKit projects, but the libraries themselves are plain TypeScript/JavaScript.

## Architecture (level‑based)

**Downhill imports only.** Higher levels may depend on lower levels; never sideways or upward.

- **Level 0 — `@ooopsstudio/root`**  
  Contracts, ports, tokens, and tiny utilities. No runtime logic, no side effects, no barrels.
- **Level 1 — Engines**
  DI‑free factories and primitives (e.g., datastructures, time, transport). Pure mechanisms, no presets.
- **Level 2 — Edges**
  `defaults` (safe fallbacks) and `bridges` (token‑only connectors). Optional, idempotent, no‑throw.
- **Level 3 — Services**
  Featureful libraries with presets (logging, metrics, tracing, error handling, etc.).

Import rules are enforced with dependency‑cruiser and ESLint.

## Implemented packages

### `@ooopsstudio/root` (Level 0)

Source of truth for **contracts**, **ports**, **tokens**, and tiny **utilities**. Everything is side‑effect‑free.

**Import style**
```ts
import type { Logging } from '@ooopsstudio/root/contracts/logging'
import type { LogSink } from '@ooopsstudio/root/ports/transport'
import { TOK } from '@ooopsstudio/root/tokens'
```

**No barrels.** Subpath imports only.

## Repository layout

```
/packages
  /root
    src/
      contracts/
      ports/
      tokens/
      utils/
      testing/
    size-limit.json
/specs
  /registry
    engines.yaml, services.yaml, ports.yaml, tokens.yaml
	/schemas
		engines.schema.json, services.schema.json, ports.schema.json, tokens.schema.json
/.github/workflows
  ci.yml
eslint.config.js
tsconfig.base.json
vitest.config.ts
.dependency-cruiser.cjs
```

## Tooling and configs

- **Package manager:** pnpm workspaces (root lockfile)
- **Node / pnpm:** Node 20.x and 22.x; pnpm 9.x
- **TypeScript:** latest stable; strict; `no any` policy; shared `tsconfig.base.json`
- **Bundler:** tsup (ESM + d.ts + sourcemaps; `"sideEffects": false` where valid)
- **Tests:** Vitest (Node environment, V8 coverage); thresholds enforced in CI
- **Linting:** ESLint flat config with `@typescript-eslint`, `@stylistic`, `eslint-plugin-import` + TS resolver
- **Graph checks:** dependency‑cruiser (cycles and level fences)
- **Size budget:** size‑limit (per package, min+gzip budgets)
- **Publishing:** changesets (semver, per‑package changelogs)
- **Commits:** commitlint (Conventional Commits) + Husky hooks

## Scripts (root)

Common entrypoints, run at the workspace root:

```
pnpm -w lint             # ESLint (flat config)
pnpm -w typecheck        # TypeScript
pnpm -w test             # Vitest + coverage
pnpm -w build            # tsup
pnpm -w size             # size-limit
pnpm -w depcruise        # dependency-cruiser checks
pnpm -w publint          # package export sanity
pnpm -w attw             # are-the-types-wrong
pnpm -w validate         # chains lint, typecheck, test, depcruise, publint, attw, size, registry validation
```

Per‑package runs are filtered, for example:

```
pnpm -w -F @ooopsstudio/root test
pnpm -w -F @ooopsstudio/root build
pnpm -w -F @ooopsstudio/root size
```

## Continuous Integration

GitHub Actions runs on pushes and PRs:

- Matrix: Node 20.x and 22.x on `ubuntu-latest`
- Caching: setup‑node cache for pnpm store
- Fast paths: doc‑only and “no packages changed” checks
- Single entrypoint: CI invokes `pnpm -w validate` to keep logic in code, not YAML

## Coding standards

- **Documentation policy:** every file starts with a single `@file` JSDoc paragraph that explains when/why/what/how and ends with an inline “Example:”. Every exported symbol has concise JSDoc with `@param`, `@returns`, and at least one deterministic `@example`.
- **No `any`:** prefer `unknown` with guards or generics.
- **No side effects at import:** functions/constants only.
- **Security:** never log secrets/PII; redaction is on by default in services that support it.
- **Imports:** explicit subpaths from `@ooopsstudio/root`; services communicate via ports and tokens, not direct imports.

## Size budgets

Each package defines its own `size-limit.json`. For root:

```json
[
  {
    "name": "root: runtime surfaces",
    "path": [
      "dist/contracts/*.js",
      "dist/ports/*.js",
      "dist/tokens/index.js",
      "dist/utils/*.js"
    ],
    "limit": "5 kB"
  },
  {
    "name": "root: logging contract (sentinel)",
    "path": "dist/contracts/logging.js",
    "limit": "1.5 kB"
  }
]
```

## Versioning & releases

- Managed by **Changesets**.
- Ports and tokens are **public API**. Renaming or removing them is a major version.
- Additive type fields are minor; breaking type changes are major.

## Contributing

1. Follow the documentation policy and “no `any`” rule.
2. Add tests for every exported API; use `@ooopsstudio/root/testing` fakes for deterministic behavior.
3. Respect level fences; avoid service↔service imports.
4. Run `pnpm -w validate` locally before pushing.

## License

MIT © Ooops Design Studio