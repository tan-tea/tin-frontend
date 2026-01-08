import type { ReactNode } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getShopDetailsBySlug } from 'app/actions';
import { getQueryClient } from 'app/get-query-client';

type LayoutProps = Readonly<{
    children: ReactNode;
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}>

export default async function Layout(props: LayoutProps) {
    const { children, params } = props;

    const slug = (await params).slug;

    const queryClient = getQueryClient();

    queryClient.prefetchQuery({
        queryKey: ['shop-by-slug', slug],
        queryFn: () => getShopDetailsBySlug(slug),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}
