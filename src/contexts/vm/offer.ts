import 'server-only';

import type { Offer } from 'shared/models';

import { formatISO } from 'date-fns';
import { eq, lte, gte } from 'drizzle-orm';

import { getReadReplica } from 'lib/db';
import { categories, offers } from 'lib/db/schema';

const sharedWhereCondition = (fields: typeof offers._.columns) => {
    const iso = formatISO(new Date());
    const now = new Date(iso);

    return [
        eq(fields.isActive, true),
        lte(fields.startDate, now),
        gte(fields.endDate, now),
    ];
}

const withPagination = <T>(result: Array<T>, limit: number) => {
    const hasNextPage = result?.length > limit;
    const data = hasNextPage ? result.slice(0, limit) : result;
    const last = data.at(-1);

    return {
        hasNextPage,
        data,
        last,
    };
}

export async function findOfferBySlug(slug: string): Promise<Offer | null> {
    try {
        const offer = await getReadReplica()
            .query
            .offers
            .findFirst({
                with: {
                    category: true,
                    subcategory: true,
                    images: true,
                    optionGroups: {
                        with: {
                            group: {
                                with: {
                                    options: true,
                                },
                            },
                        },
                    },
                },
                where: (fields, { eq, and, }) => and(
                    ...sharedWhereCondition(fields),
                    eq(fields.slug, slug),
                ),
            });

        return offer || null;
    } catch (error) {
        throw new Error(
            `Can't get offer by slug: ${slug}`,
            { cause: error }
        );
    }
}

export async function findOffersByShopId(
    shopId: string,
    pagination: CursorPagination
): Promise<PaginatedResult<Offer>> {
    const { limit = 10, cursor } = pagination;

    try {
        const result = await getReadReplica()
            .query
            .offers
            .findMany({
                with: {
                    category: true,
                    subcategory: true,
                    shops: {
                        where: (fields, { eq }) => eq(fields.shopId, shopId),
                    },
                },
                where: (fields, { and, or, lt, eq }) =>
                    and(
                        ...sharedWhereCondition(fields),
                        cursor
                            ? or(
                                lt(fields.updatedAt, new Date(cursor.updatedAt)),
                                and(
                                    eq(fields.updatedAt, new Date(cursor.updatedAt)),
                                    lt(fields.id, cursor.id),
                                ),
                            )
                            : undefined,
                    ),
                orderBy: (fields, { desc, }) => [
                    desc(fields.updatedAt),
                    desc(fields.id),
                ],
                limit: limit + 1,
            });

        const {
            last,
            data: offers,
            hasNextPage,
        } = withPagination<Offer>(result as Offer[], limit);

        return {
            items: offers.map(offer => ({
                ...offer,
                images: [],
                optionGroups: [],
            })),
            nextCursor: hasNextPage && last
                ? {
                    updatedAt: formatISO(last.updatedAt),
                    id: last.id,
                }
                : null,
        };
    } catch (error) {
        throw new Error(
            `Can't get offers by shop id: ${shopId}`,
            { cause: error }
        );
    }
}

/**
 * @param categoryId
 * @param pagination
 * @returns All offers asociated to category
 */
export async function findOffersByCategoryId(
    categoryId: string,
    pagination: CursorPagination,
): Promise<PaginatedResult<Offer>> {
    const { limit = 20, cursor } = pagination;

    try {
        const result = await getReadReplica()
            .query
            .offers
            .findMany({
                with: {
                    category: true,
                    subcategory: true,
                    shops: true,
                },
                where: (fields, { and, or, lt }) =>
                    and(
                        ...sharedWhereCondition(fields),
                        eq(fields.categoryId, categoryId),
                        cursor
                            ? or(
                                lt(fields.updatedAt, new Date(cursor.updatedAt)),
                                and(
                                    eq(fields.updatedAt, new Date(cursor.updatedAt)),
                                    lt(fields.id, cursor.id),
                                ),
                            )
                            : undefined,
                    ),
                orderBy: (fields, { desc }) => [
                    desc(fields.updatedAt),
                    desc(fields.id),
                ],
                limit: limit + 1,
            });

        const {
            last,
            data: offers,
            hasNextPage,
        } = withPagination<Offer>(result as Offer[], limit);

        return {
            items: offers.map(offer => ({
                ...offer,
                images: [],
                optionGroups: [],
            })),
            nextCursor: hasNextPage && last
                ? {
                    updatedAt: formatISO(last.updatedAt),
                    id: last.id,
                }
                : null,
        };
    } catch (error) {
        throw new Error(
            `Can't get offers by category slug: ${categoryId}`,
            { cause: error }
        );
    }
}

export async function findOffersByCriteria(
    query: string,
    shopId: string,
    pagination: CursorPagination,
): Promise<PaginatedResult<Offer>> {
    const { limit = 5, cursor } = pagination;

    try {
        const result = await getReadReplica()
            .query
            .offers
            .findMany({
                with: {
                    category: true,
                    subcategory: true,
                    shops: true,
                },
                where: (fields, { and, eq, or, lt, ilike, }) =>
                    and(
                        ...sharedWhereCondition(fields),
                        or(
                            ilike(fields.title, `%${query}%`),
                            ilike(fields.description, `%${query}%`),
                            ilike(fields.slug, `%${query}%`),
                        ),
                        cursor
                            ? or(
                                lt(fields.updatedAt, new Date(cursor.updatedAt)),
                                and(
                                    eq(fields.updatedAt, new Date(cursor.updatedAt)),
                                    lt(fields.id, cursor.id),
                                ),
                            )
                            : undefined,
                    ),
                orderBy: (fields, { desc }) => [
                    desc(fields.updatedAt),
                    desc(fields.id),
                ],
                limit: limit + 1,
            });

        const {
            last,
            data: offers,
            hasNextPage,
        } = withPagination<Offer>(result as Offer[], limit);

         return {
            items: offers.map(offer => ({
                ...offer,
                images: [],
                optionGroups: [],
            })),
            nextCursor: hasNextPage && last
                ? {
                    updatedAt: formatISO(last.updatedAt),
                    id: last.id,
                }
                : null,
        };
    } catch (error) {
        throw new Error(
            `Can't get offers by criteria`,
            { cause: error }
        );
    }
}
