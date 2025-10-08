// packages/root/tsup.config.ts
import {defineConfig} from 'tsup'

export default defineConfig({
	entry: {
		// ratelimit
		'ratelimit/public/development': 'src/ratelimit/public/development.ts',
		'ratelimit/public/production':  'src/ratelimit/public/production.ts',
		'ratelimit/public/testing':     'src/ratelimit/public/testing.ts',
		'ratelimit/public/minimal':     'src/ratelimit/public/minimal.ts',
		'ratelimit/public/custom':      'src/ratelimit/public/custom.ts',
		'ratelimit/public/types':       'src/ratelimit/public/types.ts',

		// resilience
		'resilience/public/development': 'src/resilience/public/development.ts',
		'resilience/public/production':  'src/resilience/public/production.ts',
		'resilience/public/testing':     'src/resilience/public/testing.ts',
		'resilience/public/minimal':     'src/resilience/public/minimal.ts',
		'resilience/public/custom':      'src/resilience/public/custom.ts',
		'resilience/public/types':       'src/resilience/public/types.ts',

		// scheduling
		'scheduling/public/development': 'src/scheduling/public/development.ts',
		'scheduling/public/production':  'src/scheduling/public/production.ts',
		'scheduling/public/testing':     'src/scheduling/public/testing.ts',
		'scheduling/public/minimal':     'src/scheduling/public/minimal.ts',
		'scheduling/public/custom':      'src/scheduling/public/custom.ts',
		'scheduling/public/types':       'src/scheduling/public/types.ts'

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