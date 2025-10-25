import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Workspace } from 'contexts/wm/workspace/domain/Workspace';
import { WorkspaceId } from 'contexts/wm/workspace/domain/value-object/WorkspaceId';
import { WorkspaceRepository } from 'contexts/wm/workspace/domain/WorkspaceRepository';

export class SupabaseWorkspaceRepository
	extends SupabaseRepository<Workspace>
	implements WorkspaceRepository
{
	async getAll(): Promise<Array<Workspace>> {
		const repository = await this.from();

		const {
            data,
            error,
        } = await repository.select<'*', Workspace>();

        if (error) return [];

        return data;
	}

	async getById(id: WorkspaceId): Promise<Workspace | null> {
		const repository = await this.from();

		const { data, error } = await repository
            .select('*')
            .eq('id', id.value)
            .single<{
                id: string;
                description: string;
                logo: string;
                name: string;
                tin: string | null;
                created_at: string;
                is_verified: boolean;
            }>();

        if (error || !data) return null;

        return Workspace.fromPrimitives({
            ...data,
            description: data.description || '',
            logo: data.logo || 'https://scontent.fclo9-1.fna.fbcdn.net/v/t39.8562-6/422083590_1312812522712666_5569536549360094726_n.png?_nc_cat=111&ccb=1-7&_nc_sid=f537c7&_nc_ohc=BiLWnevaYo4Q7kNvwHfe0eP&_nc_oc=AdmShQtAtpmp3HjS_KkNV-pCKKBWeUeSvbWj-uTxbHLXwzHF5IGiIGlepQb-VfX7IeQ&_nc_zt=14&_nc_ht=scontent.fclo9-1.fna&_nc_gid=Db_BO9JSOvBBcMouA_mP-w&oh=00_Afe7EqxObM2PqHqlIhaOViputOdmUB25wvw84hAUbN_VSg&oe=68FF2CBC',
            tin: data.tin || '',
            isVerified: data.is_verified,
            createdAt: new Date(data.created_at),
        });
	}

    protected entityName(): string {
        return 'workspaces';
    }
}
