import { AttributeReadModel } from 'contexts/vm/attribute/application/query/read-model/AttributeReadModel';
import { Value } from './value';

export interface Attribute extends AttributeReadModel {
    values?: Array<Value>;
}
