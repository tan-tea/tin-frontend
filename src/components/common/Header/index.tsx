'use client'

import type {
    FC,
    ReactElement,
} from 'react';

import {
    Box,
    AppBar,
} from 'ui/index';

import UserAvatar from 'common/User/Avatar';
import ThemeButton from 'common/Header/ThemeButton';
import SearchButton from 'common/Header/SearchButton';
import LanguageButton from 'common/Header/LanguageButton';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

export type HeaderProps = object;

const HeaderMobile: FC<HeaderProps> = (
    props: HeaderProps,
) => {
    const {} = props;

    return (
        <AppBar
            position='fixed'
            className='z-10 h-header-mobile bg-dark rounded-b-2xl shadow-none'
        >
            <Box className='size-full flex items-center px-4'>
                <UserAvatar/>
                <Box className='ml-auto flex items-center gap-x-4 text-black'>
                    <ThemeButton/>
                    <LanguageButton/>
                </Box>
            </Box>
        </AppBar>
    );
}

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
                    <SearchButton/>
                    <ThemeButton/>
                    <UserAvatar/>
                </Box>
            </Box>
        </AppBar>
    );
};

export default function Header(
    props: HeaderProps
): ReactElement<FC<HeaderProps>> {
    const {} = props;

    const childProps: HeaderProps = {};

    return (
        <DeviceDetectorLayout
            MobileComponent={<HeaderMobile {...childProps}/>}
            DesktopComponent={<HeaderDesktop {...childProps}/>}
        />
    );
};
