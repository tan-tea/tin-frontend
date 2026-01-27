import { Pool } from 'pg';
import { withReplicas } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';

import { serverEnv } from 'env/server';

import * as schema from './schema';

const client = new Pool({
    connectionString: serverEnv.DATABASE_URL,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
});

const replicaClient = new Pool({
    connectionString: serverEnv.REPLICA_DATABASE_URL,
});

const REPLICA_WEIGHTS = [4, 6];
let currentIndex = -1;
let currentWeight = 0;

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const MAX_WEIGHT = Math.max(...REPLICA_WEIGHTS);
const WEIGHT_GCD = REPLICA_WEIGHTS.reduce(gcd);

function selectReplica<T>(replicas: readonly T[]): T {
    if (!replicas.length) {
        return db.$primary as T;
    }

    const weights = REPLICA_WEIGHTS.slice(0, replicas.length);

    while (true) {
        currentIndex = (currentIndex + 1) % replicas.length;

        if (currentIndex === 0) {
            currentWeight -= WEIGHT_GCD;
            if (currentWeight <= 0) {
                currentWeight = MAX_WEIGHT;
            }
        }

        if (weights[currentIndex] >= currentWeight) {
            return replicas[currentIndex]!;
        }
    }
}

export const maindb = drizzle({
    client,
    schema,
});

export const replicadb = drizzle({
    // client: replicaClient,
    client,
    schema,
});

export const db = withReplicas(maindb, [replicadb]);
// export const db = drizzle({
//     client,
//     schema,
// });

type ReplicaClient = (typeof db)['$replicas'][number];

export function getReadReplica(): ReplicaClient {
  return selectReplica(db.$replicas);
}

export const allDatabases = [maindb, replicadb] as const;
