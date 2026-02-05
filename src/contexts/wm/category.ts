import 'server-only';

import type { Category } from 'shared/models';

import { getReadReplica } from 'lib/db';

export async function findCategoryBySlug(slug: string): Promise<Category | null> {
    try {
        const category = await getReadReplica()
            .query
            .categories
            .findFirst({
                with: {
                    subcategories: true,
                },
                where: (fields, { and, eq }) => and(
                    eq(fields.slug, slug),
                ),
            });

        return category || null;
    } catch (error) {
        throw new Error(
            `Can't get category by slug: ${slug}`,
            { cause: error }
        );
    }
}
