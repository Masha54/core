// packages/root/tsup.config.ts
import {defineConfig} from 'tsup'

export default defineConfig({
	entry: {

		// Defaults
		'defaults/cache':         'src/defaults/cache.ts',
		'defaults/cleanup':       'src/defaults/cleanup.ts',
		'defaults/controller':    'src/defaults/controller.ts',
		'defaults/debug':         'src/defaults/debug.ts',
		'defaults/errors':				'src/defaults/errors.ts',
		'defaults/events':        'src/defaults/events.ts',
		'defaults/lifecycle':     'src/defaults/lifecycle.ts',
		'defaults/logging':       'src/defaults/logging.ts',
		'defaults/metrics':       'src/defaults/metrics.ts',
		'defaults/performance':   'src/defaults/performance.ts',
		'defaults/ratelimit':     'src/defaults/ratelimit.ts',
		'defaults/resilience':    'src/defaults/resilience.ts',
		'defaults/scheduling':    'src/defaults/scheduling.ts',
		'defaults/security':      'src/defaults/security.ts',
		'defaults/status':        'src/defaults/status.ts',
		'defaults/tracing':       'src/defaults/tracing.ts',

		// Bridges
		'bridges/cache-to-metrics':       'src/bridges/cache-to-metrics.ts',
		'bridges/errors-to-logging':      'src/bridges/errors-to-logging.ts',
		'bridges/logging-to-metrics':     'src/bridges/logging-to-metrics.ts',
		'bridges/logging-to-tracing':     'src/bridges/logging-to-tracing.ts',
		'bridges/performance-to-metrics': 'src/bridges/performance-to-metrics.ts',
		'bridges/ratelimit-to-metrics':   'src/bridges/ratelimit-to-metrics.ts',
		'bridges/resilience-to-metrics':  'src/bridges/resilience-to-metrics.ts',
		'bridges/scheduling-to-metrics':  'src/bridges/scheduling-to-metrics.ts',
		'bridges/status-to-metrics':      'src/bridges/status-to-metrics.ts'

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