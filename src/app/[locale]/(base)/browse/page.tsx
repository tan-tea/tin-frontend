import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';

import Browse from 'feature/Browse';

export const metadata: Metadata = {
    title: 'Map',
};

type BrowsePageProps = object;

export default function BrowsePage(
    props: BrowsePageProps
): ReactElement<FC<BrowsePageProps>> {
    const {} = props;

    return (
        <Browse/>
    );
};
