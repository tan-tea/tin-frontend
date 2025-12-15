import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';

import { getTranslations } from 'next-intl/server';

import Terms from 'pages/terms';

type TermsProps = object;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('titles');

    return {
        title: t('search.title'),
        description: t('search.description'),
    };
}

export default async function TermsPage(props: TermsProps): Promise<ReactElement<FC<TermsProps>>> {
    const {} = props;

    return (
        <Terms/>
    );
};
