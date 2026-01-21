import { ValueObject } from './ValueObject';

export class DateValueObject extends ValueObject<Date> {
	constructor(value: Date) {
		super(value);
		this.ensureValidDate(value);
	}

	static now(): DateValueObject {
		return new DateValueObject(new Date());
	}

	private ensureValidDate(value: Date): void {
		if (!(value instanceof Date) || isNaN(value.getTime())) {
			throw new Error('Invalid session date');
		}
	}
}
