'use client'

import {
    FC,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Text,
    Card,
} from 'ui/index';
import { Blob, } from 'icons/index';

import BackButton from 'common/BackButton';

import DiscordButton from 'feature/SignIn/components/DiscordButton';

type SignInMobileProps = object;

const SignInMobile: FC<SignInMobileProps> = (
    props: SignInMobileProps
) => {
    const {} = props;

    const t = useTranslations();

    return (
        <Box
            component='section'
            className='h-dvh w-full overflow-hidden'
        >
            <Box className='relative h-full w-full'>
                <BackButton className='ml-6 mt-6'/>
                <Blob className='-z-10 absolute -top-1/3 left-0 size-[1000px] fill-gray-100'/>
                <Card className='absolute bottom-0 left-0 right-0 h-auto bg-light-600 rounded-t-2xl p-6 pb-12 flex flex-col items-center gap-y-4 text-center'>
                    <Text
                        color='primary'
                        variant='h1'
                        component='h2'
                        className='text-3xl font-secondary font-bold'
                    >
                        {t('signin.title')}
                    </Text>
                    <Text
                        variant='body1'
                        component='p'
                        className='text-base font-medium text-gray-800'
                    >
                        {t('signin.description')}
                    </Text>
                    <DiscordButton/>
                </Card>
            </Box>
        </Box>
    );
};

export default SignInMobile;
