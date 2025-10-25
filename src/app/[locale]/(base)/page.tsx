import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations, } from 'next-intl/server';

import Home from 'feature/Home';

type HomePageProps = {
    searchParams: Promise<{
        [key: string]: string | Array<string> | undefined;
    }>
};

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
    const {
        searchParams,
    } = props;

    const shopId = (await searchParams).shopId;
    console.log('shop id', shopId);

    return (
        <Home/>
    );
};
