import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Variant } from '../../domain/Variant';
import { VariantRepository } from '../../domain/VariantRepository';

export class SupabaseVariantRepository
    extends SupabaseRepository<Variant>
    implements VariantRepository
{
    async getVariantsByColorId(colorId: ExternalId): Promise<Array<Variant>> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('color_id', colorId.value);

        if (error && !data) return [];

        const variants = this.parseObjectToCamelCase(data);
        return variants.map(v => Variant.fromPrimitives({
            ...v,
            r: v.r || 0,
            g: v.g || 0,
            b: v.b || 0,
            alpha: v.alpha || 0,
        }));
    }

    protected entityName(): string {
        return 'customization_color_variants';
    }
}
