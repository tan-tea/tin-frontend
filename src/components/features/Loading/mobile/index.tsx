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
                <Box className='relative w-20 h-[50px]'>
                    <Text
                        component='span'
                        className='absolute top-0 text-[#C8B6FF] text-[0.8rem] tracking-[1px] animate-[var(--animate-text_713)]'
                    >
                        {t('message')}
                    </Text>
                    <Text
                        component='span'
                        className='absolute bottom-0 block h-4 w-4 rounded-full bg-[#9A79FF] translate-x-[64px] animate-[var(--animate-loading_713)]'
                    >
                        <Text
                            component='span'
                            className='absolute inset-0 block rounded-full bg-[#D1C2FF] animate-[var(--animate-loading2_713)]'
                        />
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default LoadingMobile;
