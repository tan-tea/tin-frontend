import type { ReactNode } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from 'app/get-query-client';

type LayoutProps = Readonly<{
    params: Promise<{ locale: string }>;
    children: ReactNode;
}>;

export default function Layout(props: LayoutProps) {
    const { children } = props;

    const queryClient = getQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}
