import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from 'app/get-query-client';

import Signup from 'pages/signup';

type PageProps = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { params } = props;

    const locale = (await params).locale;

    const t = await getTranslations({
        namespace: 'metadata',
        locale,
    });

    return {};
};

export default async function Page(props: PageProps) {
    const { params } = props;

    const locale = (await params).locale;

    const queryClient = getQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Signup locale={locale}/>
        </HydrationBoundary>
    );
}
