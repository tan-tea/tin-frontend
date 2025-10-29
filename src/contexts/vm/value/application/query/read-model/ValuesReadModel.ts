import { Value } from 'contexts/vm/value/domain/Value';
import { ValueReadModel } from './ValueReadModel';

export class ValuesReadModel {
    readonly values: Array<ValueReadModel>;

    constructor(values: Array<Value>) {
        this.values = values.map((value) => value.toPrimitives());
    }
}
