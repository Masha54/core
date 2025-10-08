#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import yaml from 'yaml'

const root = process.cwd()
const specsDir = path.join(root, 'specs', 'registry')
const schemaDir = path.join(root, 'specs', 'schemas')

const files = [
	['tokens.yaml',  'tokens.schema.json'],
	['ports.yaml',   'ports.schema.json'],
	['services.yaml', 'services.schema.json'],
	['engines.yaml', 'engines.schema.json']
]

const ajv = new Ajv({allErrors: true}) // Use default configuration
addFormats(ajv)

let ok = true
for (const [fname, sname] of files) {
	const fpath = path.join(specsDir, fname)
	if (!fs.existsSync(fpath)) continue

	const schema = JSON.parse(fs.readFileSync(path.join(schemaDir, sname), 'utf8'))
	const validate = ajv.compile(schema)

	const doc = yaml.parse(fs.readFileSync(fpath, 'utf8'))
	const valid = validate(doc)

	if (!valid) {
		ok = false
		console.error(`\n❌ ${fname} failed schema ${sname}`)
		for (const err of validate.errors ?? []) {
			console.error(`  • ${err.instancePath || '(root)'} ${err.message}`)
		}
	} else {
		console.log(`✅ ${fname} ✓`)
	}
}

if (!ok) process.exit(1)