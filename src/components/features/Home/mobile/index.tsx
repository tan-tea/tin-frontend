'use client'

import type {
    FC,
} from 'react';

import {
    Box,
} from 'ui/index';

import { HomeProps, } from 'feature/Home';

type HomeMobileProps = HomeProps;

const HomeMobile: FC<HomeMobileProps> = (
    props: HomeMobileProps
) => {
    const {
        t,
    } = props;

    return (
        <Box
            component='section'
            className='h-dvh-screen-mobile w-full overflow-hidden'
        >
        </Box>
    );
};

export default HomeMobile;
