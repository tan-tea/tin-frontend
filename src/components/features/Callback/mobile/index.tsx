'use client'

import type {
    FC,
} from 'react';

import {
    Box,
    Text,
} from 'ui/index';

import { CallbackProps, } from 'feature/Callback';

type CallbackMobileProps = CallbackProps;

const CallbackMobile: FC<CallbackMobileProps> = (
    props: CallbackMobileProps,
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
            <Box className='size-full p-4'>
                <Box className='size-full text-center flex flex-col items-center justify-center gap-y-2'>
                    <Text
                        variant='h1'
                        component='h2'
                        className='text-2xl text-center font-secondary font-bold'
                    >
                        Hey pana
                    </Text>
                    <Text
                        variant='body1'
                        component='p'
                        className='text-sm'
                    >
                        Ya casi estamos listos, danos un momento. Te redigiremos apenas acabemos.
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default CallbackMobile;
