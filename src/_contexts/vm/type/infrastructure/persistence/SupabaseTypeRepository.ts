import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Type } from '../../domain/Type';
import { TypeRepository } from '../../domain/TypeRepository';
import { TypeId } from '../../domain/value-object/TypeId';

export class SupabaseTypeRepository extends SupabaseRepository<Type> implements TypeRepository {
    async getTypeById(id: TypeId): Promise<Type | null> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('id', id.value)
            .single();

        if (error && !data) return null;

        const type = this.parseObjectToCamelCase(data);

        return Type.fromPrimitives({
            ...type,
        });
    }

    protected entityName(): string {
        return 'offer_types';
    }
}
