import {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations } from 'next-intl/server';

import SignIn from 'feature/SignIn';

type SignInPageProps = {
    params: Promise<unknown>;
    searchParams: Promise<unknown>;
};

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();

    return {
        title: t('signin.title'),
        description: t('signin.description'),
    };
}

export default function SigninPage(
    props: SignInPageProps
): ReactElement<FC<SignInPageProps>> {
    const {} = props;

    return (
        <SignIn/>
    );
};
