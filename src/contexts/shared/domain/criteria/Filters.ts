import { Filter } from './Filter';

export class Filters {
	readonly filters: Array<Filter>;

	constructor(filters: Array<Filter>) {
		this.filters = filters;
	}

	static fromValues(values: Array<Map<string, string>>): Filters {
		return new Filters(values.map(Filter.fromValues));
	}

	static none(): Filters {
		return new Filters([]);
	}
}
