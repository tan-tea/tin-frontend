import {
    Dexie,
    Table,
} from 'dexie';

import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';

export abstract class DexieRepository<T extends AggregateRoot> {
    constructor(private readonly database: Dexie) {}

    protected abstract entityName(): string;

    protected client(): Dexie {
        return this.database;
    }

    protected repository(): Table<T> {
        return this.database.table(this.entityName());
    }

    protected async persist(aggregateRoot: T): Promise<void> {
        const table = this.repository();
        await table.add(aggregateRoot);
    }
}
