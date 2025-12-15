import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations } from 'next-intl/server';

import NotFound from 'components/pages/not-found';

type NotFoundProps = object;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('titles.notFound');

    return {
        title: t('title'),
        description: t('description'),
    };
};

export default async function NotFoundPage(
    props: NotFoundProps
): Promise<ReactElement<FC<NotFoundProps>>> {
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
