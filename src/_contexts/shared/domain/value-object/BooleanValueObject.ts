import { ValueObject } from './ValueObject';

export class BooleanValueObject extends ValueObject<boolean> {
	constructor(value: boolean) {
		super(value);
		this.ensureIsValid(value);
	}

	private ensureIsValid(value: boolean): void {
		if (typeof value !== 'boolean') {
			throw new Error('Invalid boolean value');
		}
	}
}
