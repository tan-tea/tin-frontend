import type { Metadata, } from 'next';

import { getTranslations } from 'next-intl/server';

import Terms from 'pages/terms';

type PageProps = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { params } = props;

    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
    });

    return {
        title: 'MyTitle',
        description: 'MyDescription',
    };
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const locale = (await params).locale;

    return (
        <Terms locale={locale}/>
    );
};
