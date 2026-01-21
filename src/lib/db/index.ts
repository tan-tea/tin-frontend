import { Pool } from 'pg';
import { withReplicas } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';

import { serverEnv } from 'env/server';

import * as schema from './schema';

const client = new Pool({
    connectionString: serverEnv.DATABASE_URL,
    ssl: true,
});

export const maindb = drizzle({
    client,
    schema,
});

const replicaClient = new Pool({
    connectionString: serverEnv.REPLICA_DATABASE_URL,
    ssl: true,
});

export const replicadb = drizzle({
    client: replicaClient,
    schema,
});

export const db = withReplicas(maindb, [replicadb]);

export const allDatabases = [maindb, replicadb] as const;
