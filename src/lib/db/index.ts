import { Pool } from 'pg';
import { withReplicas } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';

import { serverEnv } from 'env/server';

import { relations } from './relations';

const client = new Pool({
    connectionString: serverEnv.MAIN_DATABASE_URL,
    ssl: true,
});

export const maindb = drizzle({
    client,
    relations,
});

const replicaClient = new Pool({
    connectionString: serverEnv.REPLICA_DATABASE_URL,
    ssl: true,
});

export const replicadb = drizzle({
    client: replicaClient,
    relations,
});

export const db = withReplicas(maindb, [replicadb]);

export const allDatabases = [maindb, replicadb] as const;
