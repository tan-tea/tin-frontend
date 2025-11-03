import { Color } from 'contexts/wm/color/domain/Color';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Customization } from '../../domain/Customization';
import { CustomizationRepository } from '../../domain/CustomizationRepository';

export class SupabaseCustomizationRepository
    extends SupabaseRepository<Customization>
    implements CustomizationRepository
{
    async getCustomizationByWorkspaceId(workspaceId: ExternalId): Promise<Customization | null> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('workspace_id', workspaceId.value)
            .single();

        if (error && !data) return null;

        const customization = this.parseObjectToCamelCase(data);

        return Customization.fromPrimitives({
            ...customization,
        });
    }

    async getCustomizationFullByWorkspaceId(workspaceId: ExternalId): Promise<null> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select(`
                *,
                colors:customization_colors (
                    *,
                    variants:customization_color_variants ( * )
                )
            `)
            .eq('workspace_id', workspaceId.value)
            .single();

        if (error && !data) return null;

        const parsed = this.parseObjectToCamelCase(data);

        const customization = Customization.fromPrimitives({
            ...parsed,
        });

        return null;
        // return {
        //     ...customization,
        //     colors: parsed.cu
        // }
    }

    protected entityName(): string {
        return 'customizations';
    }
}
