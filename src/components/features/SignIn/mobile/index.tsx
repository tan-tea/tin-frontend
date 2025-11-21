'use client'

import type {
    FC,
} from 'react';

import { useHideUI } from 'shared/hooks';

import {
    Box,
    Text,
} from 'ui/index';
import {
    Field,
    FieldLabel,
    FieldControl,
} from 'ui/field';

import type { SignInProps, } from 'feature/SignIn';

import Section from 'common/Section';
import Titlebar from 'common/Titlebar';
import BackButton from 'common/buttons/BackButton';
import InstagramButton from '../components/InstagramButton';

type SignInMobileProps = SignInProps;

const SignInMobile: FC<SignInMobileProps> = ({
    t,
    workspace,
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
            <Box className='block size-full p-4 dark:text-light-400'>
                <Box className='flex flex-col gap-y-2 mb-6 text-center'>
                    <Text component='h2' className='text-2xl leading-6 font-secondary font-semibold'>
                        Welcome back to {workspace?.name}!
                    </Text>
                    {workspace?.description && (
                        <Text className='text-sm leading-5'>
                            {workspace?.description}
                        </Text>
                    )}
                </Box>
                {/* <Field>
                    <FieldLabel>Email Address</FieldLabel>
                    <FieldControl placeholder='Example: john.doe@mail.com'/>
                </Field> */}
                <InstagramButton/>
            </Box>
        </Section>
    );
};

export default SignInMobile;
