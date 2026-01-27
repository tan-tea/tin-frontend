import 'server-only';

import type { Workspace } from 'shared/models';

import { getReadReplica } from 'lib/db';

export async function findVerifiedWorkspaceById(id: string): Promise<Workspace | null> {
    try {
        const workspace = await getReadReplica()
            .query
            .workspaces
            .findFirst({
                with: {
                    segment: true,
                    categories: {
                        where: (fields, { eq }) => eq(fields.isActive, true),
                    },
                },
                where: (fields, { eq, and }) => and(
                    eq(fields.id, id),
                    eq(fields.isVerified, true),
                ),
            });

        return workspace || null;
    } catch (error) {
        throw new Error(
            `Error on get workspace by id: ${id}`,
            { cause: error, }
        );
    }
}
