import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Value } from '../../domain/Value';
import { ValueRepository } from '../../domain/ValueRepository';

export class SupabaseValueRepository extends SupabaseRepository<Value> implements ValueRepository {
    async getValuesByAttributeId(attributeId: ExternalId): Promise<Array<Value>> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('attribute_id', attributeId.value);

        if (error && !data) return [];

        const values = this.parseObjectToCamelCase(data);
        return values.map(value => Value.fromPrimitive({
            ...value,
            label: value?.label || '',
        }));
    }

    protected entityName(): string {
        return 'offer_attribute_values';
    }
}
