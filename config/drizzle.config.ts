import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/shared/infrastructure/database/schema/migration-schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
  out: process.env.DD_MIGRATIONS_DIR ?? './database/migrations',
  introspect: { casing: 'camel' },
  schemaFilter: ['public'],
});
