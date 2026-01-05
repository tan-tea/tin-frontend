import 'lib/db/polyfill';

import type { EntityTable } from 'dexie';

import Dexie from 'dexie';

import { indexedDB, IDBKeyRange, } from 'fake-indexeddb';

import type {
    Offer,
    History,
    Workspace,
    Category,
    Customization,
    Shop,
    Cart,
} from 'shared/models';

export interface CacheDatabaseTables {
    readonly history: EntityTable<History, 'key'>;
    readonly workspaces: EntityTable<Workspace, 'id'>;
    readonly customizations: EntityTable<Customization, 'id'>;
    readonly offers: EntityTable<Offer, 'id'>;
    readonly categories: EntityTable<Category, 'id'>;
    readonly shops: EntityTable<Shop, 'id'>;
    readonly carts: EntityTable<Cart, 'id'>;
}

export class CacheDatabase extends Dexie implements CacheDatabaseTables {
    history!: EntityTable<History, 'key'>;
    workspaces!: EntityTable<Workspace, 'id'>;
    customizations!: EntityTable<Customization, 'id'>;
    offers!: EntityTable<Offer, 'id'>;
    categories!: EntityTable<Category, 'id'>;
    shops!: EntityTable<Shop, 'id'>;
    carts!: EntityTable<Cart, 'id'>;

    constructor() {
        super('cache', {
            autoOpen: true,
            ...((typeof window === 'undefined' || !window.indexedDB) && {
                indexedDB,
                IDBKeyRange,
            })
        });

        this.version(1).stores({
            history: 'key,createdAt',
            workspaces: 'id',
            customizations: 'id',
            offers: 'id',
            categories: 'id',
            shops: 'id',
            carts: 'id',
        });
    }
}

declare global {
    var _dbInstance: CacheDatabase;
};

if (!globalThis._dbInstance)
    globalThis._dbInstance = new CacheDatabase();

const db: CacheDatabase = globalThis._dbInstance;

export default db;
