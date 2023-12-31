// apps/server/src/database/customMigrationSource.ts

import fs from 'fs';
import path from 'path';

class CustomMigrationSource {
  migrationDirectory: any;

  constructor(migrationDirectory) {
    this.migrationDirectory = migrationDirectory;
  }

  // This method should return a list of migration names
  async getMigrations() {
    const files = await fs.promises.readdir(this.migrationDirectory);
    return files.filter((file) => path.extname(file) === '.js');
  }

  // This method should return the name of a migration
  getMigrationName(migration) {
    return migration;
  }

  // This method should require and return the migration module
  getMigration(migration) {
    return require(path.join(this.migrationDirectory, migration));
  }

  // This method should validate the migration structure (optional)
  validateMigrationStructure(migration) {
    return true; // Basic validation
  }
}

export default CustomMigrationSource;
