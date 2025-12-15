import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations, } from 'next-intl/server';

import Home from 'components/pages/home';

type HomePageProps = {
    params: Promise<{
        locale: string;
    }>;
    searchParams: Promise<{
        [key: string]: string | Array<string> | undefined;
    }>;
};

export async function generateMetadata(
    props: HomePageProps,
): Promise<Metadata> {
    const {
        params,
    } = props;

    const { locale } = await params;

    const t = await getTranslations('metadata');

    return {
        title: t('siteName'),
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
