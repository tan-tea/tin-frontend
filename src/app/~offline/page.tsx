import type { Metadata } from 'next';

import { Fragment } from 'react';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Offline',
    };
};

export default function Page() {
    return (
        <Fragment>
            <h1>This is offline fallback page</h1>
            <h2>When offline, any page route will fallback to this page</h2>
        </Fragment>
    );
}
