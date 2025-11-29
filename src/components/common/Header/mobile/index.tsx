'use client'

import type {
    FC
} from 'react';

import {
    Box,
    AppBar,
} from 'ui/index';

import type {
    HeaderProps
} from 'common/Header';

import Menu from 'common/Menu';
import Search from 'common/Search';
import Logo from 'components/Logo';

const HeaderMobile: FC<HeaderProps> = (props) => {
    'use memo'
    const {
        shops,
        workspace,
        customization,
        scrolling,
        currentShop,
        onSelectShop,
    } = props;


    return (
        <AppBar
            position='fixed'
            scrolling={scrolling}
            className='z-50 py-4 h-header-mobile bg-dark rounded-b-2xl shadow-none dark:bg-dark-600'
        >
            <Box className='size-full grid grid-cols-3 items-center px-4'>
                <Search/>
                <Box className='h-full flex items-center gap-x-1'>
                    <Logo/>
                </Box>
                <Box className='ml-auto flex items-center gap-x-3'>
                    <Menu/>
                </Box>
            </Box>
        </AppBar>
    );
}

export default HeaderMobile;
