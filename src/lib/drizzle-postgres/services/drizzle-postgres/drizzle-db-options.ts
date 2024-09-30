import { ClientConfig, PoolConfig } from 'pg';

export type DrizzleDbOptions =
  | {
      connection: 'client';
      config: ClientConfig;
    }
  | {
      connection: 'pool';
      config: PoolConfig;
    };
