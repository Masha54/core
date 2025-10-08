import {defineConfig, mergeConfig} from 'vitest/config'

import base from '../../vitest.config'

export default mergeConfig(base, defineConfig({
	test: {
		passWithNoTests: true,
		coverage: {
			exclude: [
				'**/*.d.ts',
				'**/*.{test,spec}.{ts,tsx}',
				'**/__tests__/**',
				'src/index.ts',     // intentionally empty barrel killer
				'src/testing/**',   // published fakes/fixtures are not runtime code
				'src/contracts/**', // Type definitions only
				'src/ports/**',     // Type definitions only
				'src/utils/types.ts' // Type definitions only
			],

			thresholds: {
				perFile: true,
				statements: 90,
				branches: 90,
				functions: 90,
				lines: 90
			}
		}
	}
}))
