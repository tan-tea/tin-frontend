'use client'

import type {
    FC,
} from 'react';

import {
    Box,
    Text,
    Button,
} from 'ui/index';

import { LoadingProps, } from 'feature/Loading';

import BackButton from 'common/BackButton';

type LoadingDesktopProps = LoadingProps;

const LoadingDesktop: FC<LoadingDesktopProps> = (
    props: LoadingDesktopProps
) => {
    const {
        t,
        navigation: {
            navigate,
        },
    } = props;

    return (
        <Box
            component='section'
            className='h-dvh w-full overflow-hidden'
        >
            <Box className='relative size-full p-4'>
                <BackButton className='ml-4 mt-4'/>
                <Box className='size-full flex flex-col justify-center gap-y-4 items-center'>
                    <Text
                        variant='h1'
                        component='h2'
                        className='text-primary font-secondary text-2xl font-bold text-center'
                    >
                        {t('notFound.title')}
                    </Text>
                    <Text
                        variant='body1'
                        component='p'
                        className='text-sm text-gray-800 text-center'
                    >
                        {t('notFound.description')}
                    </Text>
                    <Button
                        block
                        mobile
                        rounded='full'
                        variant='contained'
                        onClick={() => navigate('/')}
                    >
                        {t('notFound.home')}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default LoadingDesktop;
