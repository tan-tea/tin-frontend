'use client'

import {
    FC,
    ReactElement,
} from 'react';

type ErrorProps = object;

export default function ErrorPage(
    props: ErrorProps,
): ReactElement<FC<ErrorProps>> {
    const {} = props;

    return (
        <h1>something went wrong</h1>
    );
};
