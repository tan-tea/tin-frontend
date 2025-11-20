'use client'

import type {
    FC,
} from 'react';

import { useHideUI } from 'shared/hooks';

import { Box } from 'ui/index';
import {
    Field,
    FieldLabel,
    FieldControl,
} from 'ui/field';

import type { SignInProps, } from 'feature/SignIn';

import Section from 'common/Section';
import Titlebar from 'common/Titlebar';
import BackButton from 'common/buttons/BackButton';

type SignInMobileProps = SignInProps;

const SignInMobile: FC<SignInMobileProps> = ({
    t,
}) => {
    'use memo'
    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    return (
        <Section
            label={t('signin.title')}
            description={t('signin.description')}
            className='h-full min-h-dvh'
        >
            <Titlebar
                border={false}
                position='relative'
                renderStart={() => <BackButton/>}
            />
            <Box className='block size-full p-4'>
                <Field>
                    <FieldLabel>Email Address</FieldLabel>
                    <FieldControl placeholder='Example: john.doe@mail.com'/>
                </Field>
            </Box>
        </Section>
    );
};

export default SignInMobile;
