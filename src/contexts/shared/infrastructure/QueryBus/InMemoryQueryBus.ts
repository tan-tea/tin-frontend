import { Query } from 'contexts/shared/domain/Query';
import { Result } from 'contexts/shared/domain/Result';
import { QueryBus } from 'contexts/shared/domain/QueryBus';

import { QueryHandlers } from './QueryHandlers';

export class InMemoryQueryBus implements QueryBus {
	constructor(private readonly queryHandlers: QueryHandlers) {}

	async ask<R extends Result>(query: Query): Promise<R> {
		const queryHandler = this.queryHandlers.get(query);
		return (await queryHandler.handle(query)) as unknown as Promise<R>;
	}
}
