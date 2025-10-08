# @ooopsstudio/security

## 0.1.0

### Minor Changes

- [#1](https://github.com/Ooops-Studio/core/pull/1) [`c213e96`](https://github.com/Ooops-Studio/core/commit/c213e96328fd5db308c8277c8b89392bd10faa90) Thanks [@italiour](https://github.com/italiour)! - feat: establish monorepo infrastructure with package validation

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

## 0.2.0

### Minor Changes

- [#1](https://github.com/Ooops-Studio/core/pull/1) [`d04c601`](https://github.com/Ooops-Studio/core/commit/d04c601b975d9194f44aa49bed03266089720598) Thanks [@italiour](https://github.com/italiour)! - Initialize monorepo structure with core packages and automation
