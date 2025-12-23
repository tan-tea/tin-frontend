import type { Metadata, } from 'next';

import { getTranslations } from 'next-intl/server';

import Privacy from 'pages/privacy';

type PrivacyPageProps = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();

    return {
        title: 'Privacy',
        description: 'Privacy policy page',
    };
}

export default function PrivacyPage(props: PrivacyPageProps) {
    const {} = props;

    return (
        <Privacy/>
    );
};
