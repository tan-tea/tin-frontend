import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { Value } from './Value';

export interface ValueRepository {
    getValuesByAttributeId(attributeId: ExternalId): Promise<Array<Value>>;
}
