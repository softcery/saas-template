import { DrizzleDbOptions } from '../services/drizzle-postgres/drizzle-db-options';

export interface IDrizzlePostgresModuleOptions {
  db: DrizzleDbOptions;
  schema: Record<string, unknown>;
}
