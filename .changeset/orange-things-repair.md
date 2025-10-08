---
"@ooopsstudio/cache": minor
"@ooopsstudio/edges": minor
"@ooopsstudio/engines": minor
"@ooopsstudio/errors": minor
"@ooopsstudio/logging": minor
"@ooopsstudio/observability": minor
"@ooopsstudio/root": minor
"@ooopsstudio/runtime": minor
"@ooopsstudio/security": minor
"@ooopsstudio/workload": minor
---

feat: establish monorepo infrastructure with package validation

dd comprehensive package structure and validation system for managing multiple packages with strict dependency boundaries.

## Added
- Level 0-3 package architecture with downhill-only imports
- Package-specific ESLint configuration for dependency enforcement
- Dependency-cruiser rules for import boundary validation
- YAML registry files for ports, tokens, services, and engines
- JSON schemas for registry file validation
- Validation script for schema compliance checking

## Changed
- ESLint configuration to support package-level rules
- Build pipeline to include package-specific validation

## Why
This establishes a robust foundation for managing multiple packages with clear separation of concerns and automated validation of package boundaries and registry schemas.