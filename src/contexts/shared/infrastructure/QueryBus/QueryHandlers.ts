import { Query } from 'contexts/shared/domain/Query';
import { Result } from 'contexts/shared/domain/Result';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';

export class QueryHandlers extends Map<Query, QueryHandler<Query, Result>> {
	constructor(
		private readonly queryHandlers: Array<QueryHandler<Query, Result>>,
	) {
		super();

		this.queryHandlers.forEach((queryHandler) => {
			this.set(queryHandler.subscribedTo(), queryHandler);
		});
	}

	public get(query: Query): QueryHandler<Query, Result> {
		const queryHandler = super.get(query.constructor);
		if (!queryHandler) {
			throw new Error('Query handler not found');
		}

		return queryHandler;
	}
}
