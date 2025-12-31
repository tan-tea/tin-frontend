import type { Metadata, } from 'next';

import { getTranslations } from 'next-intl/server';

import Terms from 'pages/terms';

type PageProps = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();

    return {
        title: 'MyTitle',
        description: 'MyDescription',
    };
}

export default async function Page(props: PageProps) {
    const {} = props;

    return (
        <Terms/>
    );
};
