// packages/root/tsup.config.ts
import {defineConfig} from 'tsup'

export default defineConfig({
	entry: {
		'index': 'src/index.ts',
		'public/development': 'src/public/development.ts',
		'public/production':  'src/public/production.ts',
		'public/testing':     'src/public/testing.ts',
		'public/minimal':     'src/public/minimal.ts',
		'public/custom':      'src/public/custom.ts',
		'public/types':       'src/public/types.ts'
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