export const CURRENT_SCHEMA_VERSION = 2

/**
 * Schema version history:
 * - Version 1: Initial version (current)
 *
 * When updating the version, you should:
 * 1. Increment CURRENT_SCHEMA_VERSION
 * 2. Create a migration function in utils/migrations/migrations.ts
 * 3. Add the migration to the MIGRATIONS map
 * 4. Update this documentation
 */
