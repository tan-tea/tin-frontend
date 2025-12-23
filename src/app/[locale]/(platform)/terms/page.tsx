import type { Metadata, } from 'next';

import { getTranslations } from 'next-intl/server';

import Terms from 'pages/terms';

type TermsProps = object;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();

    return {
        title: 'MyTitle',
        description: 'MyDescription',
    };
}

export default async function TermsPage(props: TermsProps) {
    const {} = props;

    return (
        <Terms/>
    );
};
