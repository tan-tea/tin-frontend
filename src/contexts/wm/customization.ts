import 'server-only';

import type { Customization } from 'shared/models';

import { getReadReplica } from 'lib/db';

export async function findCustomizationByWorkspaceId(workspaceId: string): Promise<Customization | null> {
    try {
        const customization = await getReadReplica()
            .query
            .customizations
            .findFirst({
                with: {
                    colors: {
                        with: {
                            variants: true,
                        },
                    },
                },
                where: (fields, { eq, and }) => and(
                    eq(fields.workspaceId, workspaceId),
                ),
            });

        return customization || null;
    } catch (error) {
        throw new Error(
            `Error on get customization by workspace id: ${workspaceId}`,
            { cause: error, }
        );
    }
}
