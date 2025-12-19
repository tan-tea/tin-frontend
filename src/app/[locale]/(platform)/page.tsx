import type { Metadata, } from 'next';

import { getTranslations, } from 'next-intl/server';

import { clientEnv } from 'env/client';
import { fetchWithBackoff } from 'lib/utils';
import { getShopsDetailsByWorkspace } from 'app/actions';

// import Home from 'pages/home';
import Platform from 'pages/platform';

type PlatformPageProps = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export async function generateMetadata(
    props: PlatformPageProps,
): Promise<Metadata> {
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

export default async function PlatformPage(props: PlatformPageProps) {
    const {} = props;

    const shops = await fetchWithBackoff<
        ReturnType<typeof getShopsDetailsByWorkspace>,
        typeof getShopsDetailsByWorkspace,
        Parameters<typeof getShopsDetailsByWorkspace>
    >(getShopsDetailsByWorkspace, [clientEnv.NEXT_PUBLIC_WORKSPACE_ID])

    console.log('shops', shops);

    return (
        // <Home/>
        <Platform shops={shops ?? []}/>
    );
};
