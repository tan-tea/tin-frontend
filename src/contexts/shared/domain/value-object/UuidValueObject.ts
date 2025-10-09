import {
    v4,
    validate,
} from 'uuid';

import { ValueObject, } from 'contexts/shared/domain/value-object';

export class UuidValueObject extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureIsValidUuid(value);
    }

    static random(): UuidValueObject {
        return new UuidValueObject(v4());
    }

    private ensureIsValidUuid(value: string): void {
        if (!validate(value)) {
            throw new Error(`Invalid UUID: ${value}`);
        }
    }
}
