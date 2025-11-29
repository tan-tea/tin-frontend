import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations } from 'next-intl/server';

import Privacy from 'feature/Privacy';

type Props = object;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('titles');

    return {
        title: t('help.title'),
        description: t('help.description'),
    };
}

export default function PrivacyPage(
    props: Props
): ReactElement<FC<Props>> {
    const {} = props;

    return (
        <Privacy/>
    );
};
