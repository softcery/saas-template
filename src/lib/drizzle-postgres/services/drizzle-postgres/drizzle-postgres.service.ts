import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client, Pool } from 'pg';

import { DrizzleDbOptions } from './drizzle-db-options';

@Injectable()
export class DrizzlePostgresService {
  public async getDrizzle(options: DrizzleDbOptions, schema?: Record<string, unknown>) {
    switch (options.connection) {
      case 'client':
        const client = new Client(options.config);
        await client.connect();
        return drizzle(client, { schema });
      case 'pool':
        const pool = new Pool(options.config);
        await pool.connect();
        return drizzle(pool, { schema });
      default:
        throw new Error('Unrecognized connection type');
    }
  }
}
