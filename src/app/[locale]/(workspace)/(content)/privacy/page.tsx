import type { Metadata, } from 'next';

import { getTranslations } from 'next-intl/server';

import Privacy from 'pages/privacy';

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
        title: t('privacy.title'),
        description: t('privacy.description'),
    };
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const locale = (await params).locale;

    return (
        <Privacy locale={locale}/>
    );
};
