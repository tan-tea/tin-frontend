import { Type } from './Type';
import { TypeId } from './value-object/TypeId';

export interface TypeRepository {
    getTypeById(id: TypeId): Promise<Type | null>;
}
