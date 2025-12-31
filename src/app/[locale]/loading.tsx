import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import Loading from 'pages/loading';

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
        title: t('loading.title'),
        description: t('loading.description'),
    };
};

export default function Page(props: PageProps) {
    const {} = props;

    return (
        <Loading/>
    );
}
