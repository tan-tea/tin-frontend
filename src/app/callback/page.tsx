import {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';

import Callback from 'feature/Callback';

export const metadata: Metadata = {
    title: 'Authenticating',
};

type CallbackPageProps = object;

export default function CallbackPage(
    props: CallbackPageProps
): ReactElement<FC<CallbackPageProps>> {
    const {} = props;

    return (
        <Callback/>
    );
}
