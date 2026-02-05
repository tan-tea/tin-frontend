import 'server-only';

import type { Shop } from 'shared/models';

import { getReadReplica } from 'lib/db';

export async function findVerifiedShopsByWorkspaceId(workspaceId: string): Promise<Array<Shop>> {
    try {
        const shops = await getReadReplica()
            .query
            .shops
            .findMany({
                with: {
                    address: true,
                    geolocation: true,
                    schedules: true,
                    offers: {
                        with: {
                            offer: true,
                        },
                        orderBy: (fields, { desc }) => [
                            desc(fields.createdAt),
                        ],
                        limit: 5,
                    },
                },
                where: (fields, { eq, and }) => and(
                    eq(fields.isVerified, true),
                    eq(fields.workspaceId, workspaceId),
                ),
            });

        return shops;
    } catch (error) {
        throw new Error(
            `Error on get shops by workspace id: ${workspaceId}`,
            { cause: error, }
        );
    }
}

export async function findShopBySlugAndWorkspaceId(slug: string, workspaceId: string): Promise<Shop | null> {
    try {
        const shop = await getReadReplica()
            .query
            .shops
            .findFirst({
                with: {
                    address: true,
                    geolocation: true,
                    schedules: true,
                },
                where: (fields, { eq, and }) => and(
                    eq(fields.isVerified, true),
                    eq(fields.slug, slug),
                    eq(fields.workspaceId, workspaceId),
                ),
            });

        return shop || null;
    } catch (error) {
        throw new Error(`Error on get shop by slug: ${slug}`,
            { cause: error, }
        );
    }
}
