// packages/root/tsup.config.ts
import {defineConfig} from 'tsup'

export default defineConfig({
	entry: {
		'async/index': 'src/async/index.ts',
		'channels/index': 'src/channels/index.ts',
		'concurrency/index': 'src/concurrency/index.ts',
		'datastructures/index': 'src/datastructures/index.ts',
		'hashing/index': 'src/hashing/index.ts',
		'pipeline/index': 'src/pipeline/index.ts',
		'rate/index': 'src/rate/index.ts',
		'serde/index': 'src/serde/index.ts',
		'stats/index': 'src/stats/index.ts',
		'time/index': 'src/time/index.ts',
		'transport/index': 'src/transport/index.ts',
		'validation/index': 'src/validation/index.ts'
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