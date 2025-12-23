import type { Metadata, } from 'next';

import { getTranslations } from 'next-intl/server';

import { clientEnv } from 'env/client';
import { getShopsDetailsByWorkspace } from 'app/actions';

import { fetchWithBackoff } from 'lib/utils';

import type {
    Shop
} from 'shared/models';

import Location from 'pages/location';

type LocationPageProps = Readonly<{
    params: Promise<{
        locale: string
    }>
}>;

export async function generateMetadata(
    props: LocationPageProps
): Promise<Metadata> {
    const { params } = props;

    const _ = (await params).locale;

    const t = await getTranslations('metadata');

    return {
        title: t('location.title'),
        description: t('location.description'),
        openGraph: {
            title: t('location.title'),
            description: t('location.description'),
        },
    };
};

export default async function LocationPage(props: LocationPageProps) {
    const {} = props;

    let shops = await fetchWithBackoff<
        Array<Shop>,
        typeof getShopsDetailsByWorkspace,
        Parameters<typeof getShopsDetailsByWorkspace>
    >(getShopsDetailsByWorkspace, [clientEnv.NEXT_PUBLIC_WORKSPACE_ID]);

    if (!shops) shops = [];

    return (
        <Location shops={shops}/>
    );
};
