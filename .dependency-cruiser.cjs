/**
 * @file Dependency cruiser configuration
 * Enforces acyclic dependency graph and import hygiene in the monorepo.
 *
 * Guidance:
 * - No circular dependencies
 * - Do not import other packages’ internals (use published exports only)
 * - Production code must not depend on devDependencies
 * - Keep tests and test helpers out of runtime code
 */

const path = require('node:path')
const repoRoot = __dirname
module.exports = {
	forbidden: [
		{name: 'no-cycles',     severity: 'error', from: {}, to: {circular: true}},
		{name: 'no-unresolved', severity: 'error', from: {}, to: {couldNotResolve: true}},

		// Don’t pull test helpers into runtime
		{name: 'no-test-helpers-in-src', severity: 'error',
			from: {path: '^packages/.*/src/'},
			to:   {path: '^packages/.*/(test|__tests__|testing)/'}
		},

		// Don’t import another package’s internals (only published exports)
		{name: 'no-cross-internals', severity: 'error',
			from: {path: '^packages/.*/src/'},
			to:   {path: '^packages/.*/src/'}
		},

		// Production code must not depend on devDeps
		{name: 'no-dev-deps-in-src', severity: 'error',
			from: {path: '^packages/.*/src/'},
			to:   {dependencyTypes: ['npm-dev']}
		},

		// {
		// 	name: 'no-orphans',
		// 	severity: 'warn',
		// 	from: {orphan: true, pathNot: '^(packages/.*/(test|__tests__|public)/)'},
		// 	to: {}
		// },

		/* L0: root imports nothing */
		{name: 'l0-imports-no-other-packages', severity: 'error',
			from: {path: '^packages/root/'},
			to:   {path: '^packages/(?!root/)'} // forbid importing any package that's not root
		},

		/* L1: engines may import root only (and themselves) */
		{name: 'l1-engines-only-root', severity: 'error',
			from: {path: '^packages/engines/'},
			to:   {pathNot: '^packages/root/'}
		},

		/* L2: edges (defaults + bridges) may import root + engines only */
		{name: 'l2-edges-only-root-and-engines', severity: 'error',
			from: {path: '^packages/edges/'},
			to:   {pathNot: '^packages/(root/|engines/)'}
		},

		/* L3: services may import root + engines only */
		{name: 'l3-services-only-root-and-engines', severity: 'error',
			from: {path: '^packages/(logging|security|errors|cache|observability|runtime|workload)/'},
			to:   {pathNot: '^packages/(root/|engines/)'}
		},

		/* Services may not import edges directly */
		{name: 'no-service-to-edges', severity: 'error',
			from: {path: '^packages/(logging|security|errors|cache|observability|runtime|workload)/'},
			to:   {path: '^packages/edges/'}
		},

		/* L3: no service ↔ service imports (permit intra-package, forbid cross-package) */
		{name: 'no-service-to-service:logging', severity: 'error',
			from: {path: '^packages/logging/'},
			to:   {path: '^packages/(security|errors|cache|observability|runtime|workload)/'}
		},
		{name: 'no-service-to-service:security', severity: 'error',
			from: {path: '^packages/security/'},
			to:   {path: '^packages/(logging|errors|cache|observability|runtime|workload)/'}
		},
		{name: 'no-service-to-service:errors', severity: 'error',
			from: {path: '^packages/errors/'},
			to:   {path: '^packages/(logging|security|cache|observability|runtime|workload)/'}
		},
		{name: 'no-service-to-service:cache', severity: 'error',
			from: {path: '^packages/cache/'},
			to:   {path: '^packages/(logging|security|errors|observability|runtime|workload)/'}
		},
		{name: 'no-service-to-service:observability', severity: 'error',
			from: {path: '^packages/observability/'},
			to:   {path: '^packages/(logging|security|errors|cache|runtime|workload)/'}
		},
		{name: 'no-service-to-service:runtime', severity: 'error',
			from: {path: '^packages/runtime/'},
			to:   {path: '^packages/(logging|security|errors|cache|observability|workload)/'}
		},
		{name: 'no-service-to-service:workload', severity: 'error',
			from: {path: '^packages/workload/'},
			to:   {path: '^packages/(logging|security|errors|cache|observability|runtime)/'}
		}

	],
	options: {
		tsPreCompilationDeps: true,
		includeOnly: '^(packages)/',
		tsConfig: {fileName: path.join(repoRoot, 'tsconfig.base.json')},
		enhancedResolveOptions: {
			extensions: ['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json']
		},
		doNotFollow: {path: 'node_modules'},
		exclude: {
			path: [
				'node_modules',
				'dist',
				'coverage',
				'.husky',
				'test',
				'(^|/)\\.' // only dot-directories, not file extensions
			]
		}
	}
}