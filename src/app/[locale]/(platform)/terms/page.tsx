import type { Metadata, } from 'next';

import { getTranslations } from 'next-intl/server';

import Terms from 'pages/terms';

type PageProps = object;

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
