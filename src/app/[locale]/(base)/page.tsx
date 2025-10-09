import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations, } from 'next-intl/server';

import Home from 'feature/Home';

type HomePageProps = object;

export async function generateMetadata(
    props: HomePageProps,
): Promise<Metadata> {
    const {} = props;

    const t = await getTranslations('titles.home');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function HomePage(
    props: HomePageProps
): Promise<ReactElement<FC<HomePageProps>>> {
    const {} = props;

    return (
        <Home/>
    );
};
