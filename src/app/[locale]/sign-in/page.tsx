import {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';

import SignIn from 'feature/SignIn';

export const metadata: Metadata = {
    title: 'Sign In',
};

type SignInPageProps = {
    params: Promise<unknown>;
    searchParams: Promise<unknown>;
};

export default function SigninPage(
    props: SignInPageProps
): ReactElement<FC<SignInPageProps>> {
    const {
        params,
        searchParams,
    } = props;

    return (
        <SignIn/>
    );
};
