// packages/root/tsup.config.ts
import {defineConfig} from 'tsup'

export default defineConfig({
	entry: {

		// debug
		'debug/public/development':       'src/debug/public/development.ts',
		'debug/public/production':      'src/debug/public/production.ts',
		'debug/public/testing':      'src/debug/public/testing.ts',
		'debug/public/minimal':   'src/debug/public/minimal.ts',
		'debug/public/custom':    'src/debug/public/custom.ts',
		'debug/public/types':     'src/debug/public/types.ts',

		// metrics
		'metrics/public/development':      'src/metrics/public/development.ts',
		'metrics/public/production':     'src/metrics/public/production.ts',
		'metrics/public/testing':     'src/metrics/public/testing.ts',
		'metrics/public/minimal':  'src/metrics/public/minimal.ts',
		'metrics/public/custom':   'src/metrics/public/custom.ts',
		'metrics/public/types':    'src/metrics/public/types.ts',

		// performance
		'performance/public/development':     'src/performance/public/development.ts',
		'performance/public/production':    'src/performance/public/production.ts',
		'performance/public/testing':    'src/performance/public/testing.ts',
		'performance/public/minimal': 'src/performance/public/minimal.ts',
		'performance/public/custom':  'src/performance/public/custom.ts',
		'performance/public/types':   'src/performance/public/types.ts',

		// status
		'status/public/development':      'src/status/public/development.ts',
		'status/public/production':     'src/status/public/production.ts',
		'status/public/testing':     'src/status/public/testing.ts',
		'status/public/minimal':  'src/status/public/minimal.ts',
		'status/public/custom':   'src/status/public/custom.ts',
		'status/public/types':    'src/status/public/types.ts',

		// tracing
		'tracing/public/development':      'src/tracing/public/development.ts',
		'tracing/public/production':     'src/tracing/public/production.ts',
		'tracing/public/testing':     'src/tracing/public/testing.ts',
		'tracing/public/minimal':  'src/tracing/public/minimal.ts',
		'tracing/public/custom':   'src/tracing/public/custom.ts',
		'tracing/public/types':    'src/tracing/public/types.ts'

	},
	format: ['esm'],
	platform: 'neutral',
	target: 'node20',
	dts: {resolve: true},
	sourcemap: true,
	clean: true,
	splitting: false,
	treeshake: true,
	minify: false
})