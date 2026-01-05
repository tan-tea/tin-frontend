import type { Metadata, } from 'next';

import { getTranslations, } from 'next-intl/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import { getQueryClient } from 'app/get-query-client';
import { getShopsDetailsByWorkspace } from 'app/actions';

import Platform from 'pages/platform';

type PageProps = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { params } = props;

    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    return {
        title: t('siteName'),
        description: t('description'),
    };
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const locale = (await params).locale;

    const workspaceId = clientEnv.NEXT_PUBLIC_WORKSPACE_ID;

    const queryClient = getQueryClient();

    queryClient.prefetchQuery({
        queryKey: ['shops-by-workspace', workspaceId],
        queryFn: () => getShopsDetailsByWorkspace(workspaceId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Platform locale={locale} workspaceId={workspaceId}/>
        </HydrationBoundary>
    );
};
