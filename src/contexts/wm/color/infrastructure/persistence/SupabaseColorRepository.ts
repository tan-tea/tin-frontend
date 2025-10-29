import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Color } from '../../domain/Color';
import { ColorRepository } from '../../domain/ColorRepository';

export class SupabaseColorRepository extends SupabaseRepository<Color> implements ColorRepository {
    async getColorsByCustomizationId(customizationId: ExternalId): Promise<Array<Color>> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('customization_id', customizationId.value)

        if (error && !data) return [];

        const colors = this.parseObjectToCamelCase(data);
        return colors.map(c => Color.fromPrimitives({
            ...c,
        }));
    }

    protected entityName(): string {
        return 'customization_colors';
    }
}
