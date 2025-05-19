'use client'

import { FC, } from 'react';

import {
    Box,
    AppBar,
} from 'ui/index';

import UserAvatar from 'common/User/Avatar';
import ThemeButton from 'common/Header/ThemeButton';
import SearchButton from 'common/Header/SearchButton';

type HeaderProps = object;

const Header: FC<HeaderProps> = (
    props: HeaderProps
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
                    <SearchButton/>
                    <ThemeButton/>
                    <UserAvatar/>
                </Box>
            </Box>
        </AppBar>
    );
};

export default Header;
