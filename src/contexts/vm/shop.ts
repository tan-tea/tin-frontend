import 'server-only';

import type { Shop } from 'shared/models';

import { sql } from 'drizzle-orm';
import { formatISO } from 'date-fns';

import { getReadReplica } from 'lib/db';
import { offers } from 'lib/db/schema';

export async function findVerifiedShopsByWorkspaceId(workspaceId: string): Promise<Array<Shop>> {
    try {
        const iso = formatISO(new Date());
        const now = new Date(iso);

        const result = await getReadReplica()
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
                        where: (fields, { exists, and, eq, lte, or, gte, isNull, }) => exists(
                            getReadReplica()
                                .select({ one: sql`1` })
                                .from(offers)
                                .where(
                                    and(
                                        eq(offers.id, fields.offerId),
                                        eq(offers.isActive, true),
                                        lte(offers.startDate, now),
                                        or(
                                            gte(offers.endDate, now),
                                            isNull(offers.endDate),
                                        ),
                                    ),
                                ),
                        ),
                        orderBy: (fields, { desc }) => [
                            desc(fields.updatedAt),
                            desc(fields.createdAt),
                        ],
                        limit: 6,
                    },
                },
                where: (fields, { eq, and, }) => and(
                    eq(fields.isVerified, true),
                    eq(fields.workspaceId, workspaceId),
                ),
            });

        return result;
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
