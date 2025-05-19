import {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';

import NotFound from 'feature/NotFound';

export const metadata: Metadata = {
    title: 'Not found',
};

type NotFoundProps = object;

export default function NotFoundPage(
    props: NotFoundProps
): ReactElement<FC<NotFoundProps>> {
    const {} = props;

    return (
        <NotFound/>
    );
};
