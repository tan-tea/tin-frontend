import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations } from 'next-intl/server';

import { clientEnv } from 'env/client';
import { getShopsByWorkspace } from 'app/actions';

import { fetchWithBackoff } from 'lib/utils';

import type {
    Shop
} from 'shared/models';

import Location from 'components/pages/location';

type LocationPageProps = {
    params: Promise<{
        locale: string;
    }>;
};

export async function generateMetadata(
    props: LocationPageProps
): Promise<Metadata> {
    const { params } = props;

    const _ = (await params).locale;

    const t = await getTranslations('metadata');

    return {
        title: t('titles.location.title'),
        description: t('titles.location.description'),
        openGraph: {
            title: t('titles.location.title'),
            description: t('titles.location.description'),
        },
    };
};

export default async function LocationPage(
    props: LocationPageProps
): Promise<ReactElement<FC<LocationPageProps>>> {
    const {} = props;

    let shops = await fetchWithBackoff<
        Array<Shop>,
        typeof getShopsByWorkspace,
        Parameters<typeof getShopsByWorkspace>
    >(getShopsByWorkspace, [clientEnv.NEXT_PUBLIC_WORKSPACE_ID]);

    if (!shops) shops = [];

    return (
        <Location shops={shops}/>
    );
};
