import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getCategoryWithOffers } from 'app/actions';
import { getQueryClient } from 'app/get-query-client';

import CategoryDrawer from 'features/category/drawer';

type PageProps = Readonly<{
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}>;

export async function generateMetadata(): Promise<Metadata> {
    return {};
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const slug = (await params).slug;

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['category-offers-by-slug', slug],
        queryFn: () => getCategoryWithOffers(slug),
    });

    const category = queryClient.getQueryData<
        Awaited<ReturnType<typeof getCategoryWithOffers>>
    >(['category-offers-by-slug', slug]);
    if (!category) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoryDrawer slug={slug}/>
        </HydrationBoundary>
    );
}
