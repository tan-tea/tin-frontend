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

export default function Page(props: PageProps) {
    const {} = props;

    return (
        <Privacy/>
    );
};
