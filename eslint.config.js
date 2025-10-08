// Flat config
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import pluginImport from 'eslint-plugin-import'
import globals from 'globals'

// Flat config aligning with workspace standards (tabs, single quotes, no semicolons, max-len 100).

export default [
	js.configs.recommended,
	{ignores: ['**/dist/**', '**/coverage/**', '**/*.d.ts']},
	{
		files: ['**/*.{ts,tsx,js,mjs,cjs}'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {ecmaVersion: 2022, sourceType: 'module'},
			globals: {...globals.node}
		},
		plugins: {import: pluginImport, '@typescript-eslint': tseslint, '@stylistic': stylistic},
		settings: {
			'import/resolver': {
				typescript: {
					project: ['tsconfig.base.json'],
					alwaysTryTypes: true
				},
				node: {extensions: ['.js', '.ts', '.mjs', '.cjs']}
			},
			'import/extensions': ['.js', '.ts', '.mjs', '.cjs']
		},
		rules: {
			// Style (via stylistic)
			'@stylistic/array-bracket-spacing': ['error', 'never'],
			'@stylistic/arrow-parens': ['error', 'always'],
			'@stylistic/arrow-spacing': 'error',
			'@stylistic/comma-dangle': ['error', 'never'],
			'@stylistic/comma-spacing': ['error', {before: false, after: true}],
			'@stylistic/keyword-spacing': ['error', {before: true, after: true}],
			'@stylistic/linebreak-style': ['error', 'unix'],
			'@stylistic/max-len': ['error', {
				code: 100,
				tabWidth: 2,
				ignoreTrailingComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true
			}],
			'@stylistic/no-multiple-empty-lines': ['error', {max: 1, maxEOF: 0}],
			'@stylistic/no-trailing-spaces': 'error',
			'@stylistic/object-curly-spacing': ['error', 'never'],
			'@stylistic/quotes': ['error', 'single', {avoidEscape: true}],
			'@stylistic/semi': ['error', 'never'],
			'@stylistic/space-before-function-paren': ['error', 'never'],
			'@stylistic/space-in-parens': ['error', 'never'],
			'@stylistic/space-infix-ops': ['error', {ignoreTypes: true}],
			'@stylistic/indent': ['error', 'tab'],

			// TS rules
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}],
			'@typescript-eslint/no-explicit-any': 'error',

			// Don’t import other packages’ internals or test helpers
			'no-restricted-imports': ['error', {
				paths: [
					// root barrels banned — force explicit subpaths
					{name: '@ooopsstudio/root/contracts', message: 'Import a specific contract subpath.'},
					{name: '@ooopsstudio/root/ports',     message: 'Import a specific port subpath.'},
					// engines barrel banned — force subpaths like @ooopsstudio/engines/time
					{name: '@ooopsstudio/engines',        message: 'Import an engine subpath, e.g. @ooopsstudio/engines/time.'}
				],
				patterns: [
					// belts & suspenders
					{group: ['@ooopsstudio/root/contracts', '@ooopsstudio/root/ports'], message: 'Import specific subpaths.'},
					// no test helpers in runtime
					{group: ['@ooopsstudio/*/testing/*'], message: 'Testing helpers are not allowed in runtime code.'},
					// no deep internals from other packages
					{group: ['@ooopsstudio/*/src/**'], message: 'Do not import package internals. Use published exports/subpaths only.'},
					// config/env are app-layer only
					{group: ['@ooopsstudio/config', '@ooopsstudio/config/**', '@ooopsstudio/env', '@ooopsstudio/env/**'], message: 'Libraries must not import app configuration packages.'}
				]
			}],
			// Import hygiene
			'import/order': ['error', {
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				alphabetize: {order: 'asc', caseInsensitive: true},
				'newlines-between': 'always'
			}]
		}
	},
	// Ban `@ooopsstudio/edges` from all library/runtime source (services must not import edges).
	{
		files: ['packages/**/src/**/*.{ts,tsx,js,mjs,cjs}'],
		rules: {
			'no-restricted-imports': ['error', {
				paths: [
					{name: '@ooopsstudio/root/contracts', message: 'Import a specific contract subpath.'},
					{name: '@ooopsstudio/root/ports',     message: 'Import a specific port subpath.'},
					{name: '@ooopsstudio/engines',        message: 'Import an engine subpath, e.g. @ooopsstudio/engines/time.'}
				],
				patterns: [
					{group: ['@ooopsstudio/root/contracts', '@ooopsstudio/root/ports'], message: 'Import specific subpaths.'},
					{group: ['@ooopsstudio/*/testing/*'], message: 'Testing helpers are not allowed in runtime code.'},
					{group: ['@ooopsstudio/*/src/**'], message: 'Do not import package internals. Use published exports/subpaths only.'},
					{group: ['@ooopsstudio/config', '@ooopsstudio/config/**', '@ooopsstudio/env', '@ooopsstudio/env/**'], message: 'Libraries must not import app configuration packages.'},
					{group: ['@ooopsstudio/edges'], message: 'Edges are not allowed in library/runtime code.'},
					{group: ['@ooopsstudio/edges/**'], message: 'Edges are not allowed in library/runtime code.'}
				]
			}]
		}
	},

	// Root must not import anything from other packages.
	{
		files: ['packages/root/**/*.{ts,tsx,js,mjs,cjs}'],
		rules: {
			'no-restricted-imports': ['error', {
				patterns: ['@ooopsstudio/*']
			}]
		}
	},

	// Service ↔ service bans (self-aware per package)
	{
		files: ['packages/logging/**/*.{ts,tsx,js,mjs,cjs}'],
		rules: {
			'no-restricted-imports': ['error', {
				patterns: ['@ooopsstudio/{security,error-handling,cache,observability,runtime,workload}{,/**}', '@ooopsstudio/edges{,/**}']
			}]
		}
	},
	{
		files: ['packages/security/**/*.{ts,tsx,js,mjs,cjs}'],
		rules: {
			'no-restricted-imports': ['error', {
				patterns: ['@ooopsstudio/{logging,error-handling,cache,observability,runtime,workload}{,/**}', '@ooopsstudio/edges{,/**}']
			}]
		}
	},
	{
		files: ['packages/error-handling/**/*.{ts,tsx,js,mjs,cjs}'],
		rules: {
			'no-restricted-imports': ['error', {
				patterns: ['@ooopsstudio/{logging,security,cache,observability,runtime,workload}{,/**}', '@ooopsstudio/edges{,/**}']
			}]
		}
	},
	{
		files: ['packages/cache/**/*.{ts,tsx,js,mjs,cjs}'],
		rules: {
			'no-restricted-imports': ['error', {
				patterns: ['@ooopsstudio/{logging,security,error-handling,observability,runtime,workload}{,/**}', '@ooopsstudio/edges{,/**}']
			}]
		}
	},
	{
		files: ['packages/observability/**/*.{ts,tsx,js,mjs,cjs}'],
		rules: {
			'no-restricted-imports': ['error', {
				patterns: ['@ooopsstudio/{logging,security,error-handling,cache,runtime,workload}{,/**}', '@ooopsstudio/edges{,/**}']
			}]
		}
	},
	{
		files: ['packages/runtime/**/*.{ts,tsx,js,mjs,cjs}'],
		rules: {
			'no-restricted-imports': ['error', {
				patterns: ['@ooopsstudio/{logging,security,error-handling,cache,observability,workload}{,/**}', '@ooopsstudio/edges{,/**}']
			}]
		}
	},
	{
		files: ['packages/workload/**/*.{ts,tsx,js,mjs,cjs}'],
		rules: {
			'no-restricted-imports': ['error', {
				patterns: ['@ooopsstudio/{logging,security,error-handling,cache,observability,runtime}{,/**}', '@ooopsstudio/edges{,/**}']
			}]
		}
	}
]