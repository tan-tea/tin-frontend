import type { Metadata, } from 'next';

import { getTranslations } from 'next-intl/server';

import NotFound from 'pages/not-found';

type NotFoundProps = Readonly<object>;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('metadata');

    return {
        title: t('notFound.title'),
        description: t('notFound.description'),
    };
};

export default async function NotFoundPage(props: NotFoundProps) {
    const {} = props;

    const t = await getTranslations('notFound');

    return (
        <NotFound
            title={t('title')}
            description={t('description')}
            navigation={t('home')}
        />
    );
};
