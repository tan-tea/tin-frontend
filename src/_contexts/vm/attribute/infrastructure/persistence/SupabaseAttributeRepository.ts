import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Attribute } from '../../domain/Attribute';
import { AttributeRepository } from '../../domain/AttributeRepository';

export class SupabaseAttributeRepository
    extends SupabaseRepository<Attribute>
    implements AttributeRepository
{
    async getAttributesByTypeId(typeId: ExternalId): Promise<Array<Attribute>> {
        const repository = await this.from();

        const { data, error } = await repository.select('*').eq('type_id', typeId.value);

        if (error && !data) return [];

        const attributes = this.parseObjectToCamelCase(data);
        return attributes.map((a) =>
            Attribute.fromPrimitives({
                ...a,
            }),
        );
    }

    protected entityName(): string {
        return 'offer_attributes';
    }
}
