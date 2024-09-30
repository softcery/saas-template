import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export abstract class DrizzleRepository<Schema extends Record<string, unknown> = any> {
  constructor(protected readonly db: NodePgDatabase<Schema>) {}
}
