import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations } from 'next-intl/server';

import Help from 'feature/Help';

type HelpProps = object;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('titles');

    return {
        title: t('help.title'),
        description: t('help.description'),
    };
}

export default function HelpPage(
    props: HelpProps
): ReactElement<FC<HelpProps>> {
    const {} = props;

    return (
        <Help/>
    );
};
