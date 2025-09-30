'use client'

import type {
    FC,
} from 'react';

import {
    Box,
    Text,
    Card,
} from 'ui/index';

import BackButton from 'common/BackButton';

import { SignInProps, } from 'feature/SignIn';

import DiscordButton from 'feature/SignIn/components/DiscordButton';
import InstagramButton from 'feature/SignIn/components/InstagramButton';

type SignInMobileProps = SignInProps;

const SignInMobile: FC<SignInMobileProps> = (
    props: SignInMobileProps
) => {
    const {
        t,
    } = props;

    return (
        <Box
            component='section'
            className='h-dvh w-full overflow-hidden'
        >
            <Box className='size-full flex flex-col'>
                <Box>
                    <BackButton className='relative ml-4 mt-4'/>
                </Box>
                <Card className='grow py-3.5 px-4 flex flex-col border-none shadow-none'>
                    <Text
                        color='primary'
                        variant='h1'
                        component='h2'
                        className='text-2xl font-primary font-bold mb-1'
                    >
                        {t('signin.mobile.title')}
                    </Text>
                    <Text
                        variant='body1'
                        component='p'
                        className='text-sm text-gray-800'
                    >
                        {t('signin.mobile.description')}
                    </Text>
                    <Box className='flex flex-col mt-auto gap-y-4 pb-2.5'>
                        <DiscordButton/>
                        <InstagramButton/>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
};

export default SignInMobile;
