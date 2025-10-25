'use client'

import type {
    FC,
} from 'react';

import {
    Box,
    Text,
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
            <Box className='relative size-full flex items-center justify-center'>
                <Box className='relative w-20 h-[50px]'>
                    <Text
                        component='span'
                        className='absolute top-0 text-primary-dark font-medium text-base'
                    >
                        {t('message')}
                    </Text>
                    <Text
                        component='span'
                        className='absolute bottom-0 block h-4 w-8 rounded-full bg-primary  animate-[var(--animate-loading_713)]'
                    >
                        <Text
                            component='span'
                            className='absolute inset-0 block rounded-full bg-primary-light animate-[var(--animate-loading2_713)]'
                        />
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default LoadingMobile;
