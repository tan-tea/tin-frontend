import { TypeReadModel } from 'contexts/vm/type/application/query/read-model/TypeReadModel';
import { Attribute } from './attribute';

export interface Type extends TypeReadModel {
    attributes?: Array<Attribute>;
}
