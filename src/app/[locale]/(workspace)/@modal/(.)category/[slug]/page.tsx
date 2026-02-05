import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getCategoryBySlug } from 'app/actions';
import { cachedQueryClient } from 'app/get-query-client';

import CategoryDrawer from 'features/category/drawer';

type PageProps = Readonly<{
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}>;

export default async function Page(props: PageProps) {
    const { params } = props;

    const slug = (await params).slug;
    const locale = (await params).locale;

    const queryClient = cachedQueryClient();

    const category = await queryClient.fetchQuery({
        queryKey: ['category-by-slug', slug],
        queryFn: () => getCategoryBySlug(slug),
    });

    if (!category || 'error' in category) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoryDrawer slug={slug} locale={locale}/>
        </HydrationBoundary>
    );
}
