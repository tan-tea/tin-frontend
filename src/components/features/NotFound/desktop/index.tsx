'use client'

import type {
    FC,
} from 'react';

import {
    Box,
    Text,
    Button,
} from 'ui/index';

import { NotFoundProps, } from 'feature/NotFound';

import BackButton from 'common/BackButton';

type NotFoundDesktopProps = NotFoundProps;

const NotFoundDesktop: FC<NotFoundDesktopProps> = (
    props: NotFoundDesktopProps
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
            <Box className='relative size-full p-20'>
                <BackButton className='ml-20 mt-20'/>
                <Box className='size-full flex flex-col gap-y-6 items-center justify-center text-center'>
                    <Text
                        variant='h1'
                        component='h2'
                        className='text-primary font-secondary text-8xl font-bold max-w-6xl leading-24'
                    >
                        {t('notFound.title')}
                    </Text>
                    <Text
                        variant='body1'
                        component='p'
                        className='text-xl text-gray-800 max-w-4xl'
                    >
                        {t('notFound.description')}
                    </Text>
                    <Box className='flex items-center gap-x-4'>
                        <Button
                            variant='contained'
                            onClick={() => navigate('/')}
                        >
                            {t('notFound.home')}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFoundDesktop;
