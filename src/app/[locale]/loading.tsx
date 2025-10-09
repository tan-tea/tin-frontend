import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Loading from 'feature/Loading';

type LoadingProps = object;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('titles.loading');

    return {
        title: t('title'),
        description: t('description'),
    };
};

export default function LoadingPage(
    props: LoadingProps,
): ReactElement<FC<LoadingProps>> {
    const {} = props;

    return (
        <Loading/>
    );
}
