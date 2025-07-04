import {
    v4,
    validate,
} from 'uuid';

import { ValueObject, } from 'contexts/shared/domain/value-object';

export class Uuid extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureIsValidUuid(value);
    }

    static random(): Uuid {
        return new Uuid(v4());
    }

    private ensureIsValidUuid(value: string): void {
        if (!validate(value)) {
            throw new Error(`Invalid UUID: ${value}`);
        }
    }
}
