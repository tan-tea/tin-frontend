import { Filters } from './Filters';

export class Criteria {
	readonly filters: Filters;
	readonly limit?: number;
	readonly offset?: number;

	constructor(filters: Filters, limit?: number, offset?: number) {
		this.filters = filters;
		this.limit = limit;
		this.offset = offset;
	}

	haveFilters(): boolean {
		return this.filters.filters.length > 0;
	}
}
