'use client'

import {
    FC,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
} from 'ui/index';

type HomeDesktopProps = object;

const HomeDesktop: FC<HomeDesktopProps> = (
    props: HomeDesktopProps
) => {
    const {} = props;

    const t = useTranslations();

    return (
        <Box
            component='section'
            className='h-dvh-screen w-full overflow-hidden'
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
