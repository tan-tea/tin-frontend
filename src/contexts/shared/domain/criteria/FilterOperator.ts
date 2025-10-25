import { EnumValueObject } from '../value-object';

export enum Operator {
	EQUALS = '=',
	NOT_EQUALS = '!=',
	GREATER_THAN = '>',
	LESS_THAN = '<',
	GREATER_THAN_OR_EQUALS = '>=',
	LESS_THAN_OR_EQUALS = '<=',
}

export class FilterOperator extends EnumValueObject<Operator> {
	constructor(value: Operator) {
		super(value, Object.values(Operator));
	}

	static fromValue(value: string): FilterOperator {
		for (const operator of Object.values(Operator)) {
			if (value === operator.toString()) {
				return new FilterOperator(operator);
			}
		}

		throw new Error(`Invalid filter operator: ${value}`);
	}

	static equals(): FilterOperator {
		return this.fromValue(Operator.EQUALS);
	}

	isPositive(): boolean {
		return this.value !== Operator.NOT_EQUALS;
	}
}
