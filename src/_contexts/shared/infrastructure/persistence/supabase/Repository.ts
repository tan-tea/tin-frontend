import camelcaseKeys, {
    ObjectLike
} from 'camelcase-keys';
import { SupabaseClient, } from '@supabase/supabase-js';

import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';

export abstract class SupabaseRepository<T extends AggregateRoot> {
	constructor(private readonly _client: Promise<SupabaseClient>) {}

	protected abstract entityName(): string;

	protected get client(): Promise<SupabaseClient> {
		return this._client;
	}

	protected async from() {
		return (await this._client).from(this.entityName());
	}

	protected async persist(aggregateRoot: T): Promise<void> {
		const target = await this.from();
		await target.insert<any>(aggregateRoot);
	}

    protected parseObjectToCamelCase<R extends ObjectLike | Array<ObjectLike>>(data: R) {
        const result = camelcaseKeys(data, { deep: true, });
        return result;
    }
}
