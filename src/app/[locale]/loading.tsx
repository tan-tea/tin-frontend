import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import Loading from 'pages/loading';

type LoadingProps = Readonly<object>;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('titles.loading');

    return {
        title: t('title'),
        description: t('description'),
    };
};

export default function LoadingPage(props: LoadingProps) {
    const {} = props;

    return (
        <Loading/>
    );
}
