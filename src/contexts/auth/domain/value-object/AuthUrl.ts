import { StringValueObject, } from 'contexts/shared/domain/value-object/StringValueObject';

export class AuthUrl extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureIsValidUrl(value);
    }

    private ensureIsValidUrl(value: string): void {

    }
}
