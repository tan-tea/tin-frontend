import { URL } from 'url';

import { StringValueObject } from './StringValueObject';

export class UrlValueObject extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.ensureIsValidUrl(value);
	}

	private ensureIsValidUrl(value: string): void {
		try {
			new URL(value);
		} catch (error) {
			throw new Error('invalid picture URL' + error);
		}
	}
}
