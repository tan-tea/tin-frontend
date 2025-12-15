'use client'

import {
    FC,
} from 'react';

import {
    Box,
} from 'ui/index';

import { HomeProps, } from 'components/pages/home';

type HomeDesktopProps = HomeProps;

const HomeDesktop: FC<HomeDesktopProps> = (
    props: HomeDesktopProps
) => {
    const {
        t,
        offers,
    } = props;

    return (
        <Box
            component='section'
            className='h-dvh-screen-desktop w-full overflow-hidden'
        >
            <Box className='size-full px-20'>
                <Box className='size-full grid grid-cols-3 gap-x-12'>
                    <Box className='col-span-2 flex flex-col items-center justify-center'>
                        Hola
                    </Box>
                    <Box>
                        Adios
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HomeDesktop;
