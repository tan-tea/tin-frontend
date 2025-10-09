import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations } from 'next-intl/server';

import Search from 'feature/Search';

type SearchProps = object;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('titles');

    return {
        title: t('search.title'),
        description: t('search.description'),
    };
}

export default function SearchPage(
    props: SearchProps
): ReactElement<FC<SearchProps>> {
    const {} = props;

    return (
        <Search/>
    );
};
