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

type LoadingMobileProps = LoadingProps;

const LoadingMobile: FC<LoadingMobileProps> = (
    props: LoadingMobileProps
) => {
    const {
        t,
    } = props;

    return (
        <Box
            component='section'
            className='h-dvh w-full overflow-hidden'
        >
            <Box className='relative size-full p-4 flex items-center justify-center'>
                <Text>
                    {t('message')}
                </Text>
            </Box>
        </Box>
    );
};

export default LoadingMobile;
