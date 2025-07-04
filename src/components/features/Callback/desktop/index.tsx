'use client'

import type {
    FC,
} from 'react';

import {
    Box,
} from 'ui/index';

import { CallbackProps, } from 'feature/Callback';

type CallbackDesktopProps = CallbackProps;

const CallbackDesktop: FC<CallbackDesktopProps> = (
    props: CallbackDesktopProps,
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

            </Box>
        </Box>
    );
};

export default CallbackDesktop;
