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

import BackButton from 'common/buttons/BackButton';

type SignInDesktopProps = object;

const SignInDesktop: FC<SignInDesktopProps> = (
    props: SignInDesktopProps
) => {
    const {} = props;

    const t = useTranslations();

    return (
        <Box
            component='section'
            className='h-dvh w-full overflow-hidden'
        >
            <Box className='relative h-full w-full px-20'>
                <BackButton className='ml-20 mt-20'/>
                <Blob className='-z-10 absolute -right-1/3 top-0 h-screen w-full fill-light-500 dark:fill-dark-300'/>
                <Box className='h-full grid grid-cols-3 items-center'>
                    <Box className='col-span-2 flex flex-col gap-y-4 items-start justify-center mr-12'>
                        <Text
                            color='primary'
                            variant='h1'
                            component='h2'
                            className='text-5xl font-secondary font-bold'
                        >
                            {t('signin.title')}
                        </Text>
                        <Text
                            variant='body1'
                            component='p'
                            className='text-xl font-primary font-medium text-gray-800 dark:text-gray-200 max-w-5xl'
                        >
                            {t('signin.description')}
                        </Text>
                    </Box>
                    <Card className='col-span-1 w-full flex flex-col gap-y-6 dark:bg-dark-500'></Card>
                </Box>
            </Box>
        </Box>
    );
};

export default SignInDesktop;
