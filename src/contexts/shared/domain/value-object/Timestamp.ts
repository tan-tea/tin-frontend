import { DateValueObject } from './DateValueObject';

export class Timestamp extends DateValueObject {
	constructor(value: Date) {
		super(value);
		// this.ensureDateIsNotInPast(value);
	}

	private ensureDateIsNotInPast(value: Date): void {
		const now = new Date();
		if (now.getTime() >= value.getTime()) {
			throw new Error('Created at is in past');
		}
	}
}
