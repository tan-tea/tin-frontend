import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { Attribute } from './Attribute';

export interface AttributeRepository {
    getAttributesByTypeId(typeId: ExternalId): Promise<Array<Attribute>>;
}
