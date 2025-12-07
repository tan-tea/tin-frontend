'use client'

import type {
    FC,
} from 'react';

import {
    Box,
} from 'ui/index';

import { LocationProps, } from 'components/features/Location';

type BrowseDesktopProps = LocationProps;

const BrowseDesktop: FC<BrowseDesktopProps> = (
    props: BrowseDesktopProps
) => {
    const {
        t,
    } = props;

    return (
        <Box
            component='section'
            className='h-dvh-screen-mobile w-full overflow-hidden'
        >
            Map Desktop
        </Box>
    );
};

export default BrowseDesktop;
