import type { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from 'app/get-query-client';

// import Search from 'pages/search';

type PageProps = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export async function generateMetadata(): Promise<Metadata> {
    return {};
};

export default async function Page(props: PageProps) {
    const { params } = props;

    const locale = (await params).locale;

    const queryClient = getQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* <Cart locale={locale}/> */}
            <></>
        </HydrationBoundary>
    );
}
