'use client'

import type {
    FC
} from 'react';

import {
    Box,
    AppBar,
} from 'ui/index';

import { HeaderProps } from 'common/Header';

import ThemeButton from 'common/ThemeButton';
import UserAvatar from 'common/User/Avatar';

const HeaderDesktop: FC<HeaderProps> = (
    props: HeaderProps,
) => {
    const {} = props;

    return (
        <AppBar
            position='fixed'
            className='z-10 h-header-desktop bg-white shadow-none dark:bg-dark-600'
        >
            <Box className='size-full flex items-center px-20'>
                <Box
                    component='nav'
                    aria-label='navigation'
                    className='ml-auto h-full flex items-center gap-x-4'
                >
                    <ThemeButton/>
                </Box>
            </Box>
        </AppBar>
    );
};

export default HeaderDesktop;
