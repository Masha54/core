// packages/root/tsup.config.ts
import {defineConfig} from 'tsup'

export default defineConfig({
	entry: {
		// cleanup
		'cleanup/public/development': 'src/cleanup/public/development.ts',
		'cleanup/public/production':  'src/cleanup/public/production.ts',
		'cleanup/public/testing':     'src/cleanup/public/testing.ts',
		'cleanup/public/minimal':     'src/cleanup/public/minimal.ts',
		'cleanup/public/custom':      'src/cleanup/public/custom.ts',
		'cleanup/public/types':       'src/cleanup/public/types.ts',

		// controller
		'controller/public/development': 'src/controller/public/development.ts',
		'controller/public/production':  'src/controller/public/production.ts',
		'controller/public/testing':     'src/controller/public/testing.ts',
		'controller/public/minimal':     'src/controller/public/minimal.ts',
		'controller/public/custom':      'src/controller/public/custom.ts',
		'controller/public/types':       'src/controller/public/types.ts',

		// events
		'events/public/development': 'src/events/public/development.ts',
		'events/public/production':  'src/events/public/production.ts',
		'events/public/testing':     'src/events/public/testing.ts',
		'events/public/minimal':     'src/events/public/minimal.ts',
		'events/public/custom':      'src/events/public/custom.ts',
		'events/public/types':       'src/events/public/types.ts',

		// lifecycle
		'lifecycle/public/development': 'src/lifecycle/public/development.ts',
		'lifecycle/public/production':  'src/lifecycle/public/production.ts',
		'lifecycle/public/testing':     'src/lifecycle/public/testing.ts',
		'lifecycle/public/minimal':     'src/lifecycle/public/minimal.ts',
		'lifecycle/public/custom':      'src/lifecycle/public/custom.ts',
		'lifecycle/public/types':       'src/lifecycle/public/types.ts'

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