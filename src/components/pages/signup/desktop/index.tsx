'use client'

import type { FC } from 'react';

import { Section } from 'ui/layout';

import type { SignupProps } from 'pages/signup';

import Titlebar from 'common/titlebar';
import BackButton from 'common/buttons/back-button';

type Props = SignupProps;

const SignupDesktop: FC<Props> = ({
    t,
}) => {
    'use memo'

    return (
        <Section
            aria-label=''
            aria-description='Lorem ipsum'
        >
            Signup
        </Section>
    );
}

export default SignupDesktop;
