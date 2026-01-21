import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { Variant } from './Variant';

export interface VariantRepository {
    getVariantsByColorId(colorId: ExternalId): Promise<Array<Variant>>;
}
