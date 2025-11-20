'use client'

import type {
    FC
} from 'react';
import { useState } from 'react';

import dynamic from 'next/dynamic';

import { cn, } from 'lib/utils';

import {
    usePrefetch,
    useNavigation,
} from 'shared/hooks';

import {
    Box,
    Text,
    AppBar,
    Button,
} from 'ui/index';
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger
} from 'ui/drawer';

import type {
    HeaderProps
} from 'common/Header';

import Search from 'common/Search';
import Titlebar from 'common/Titlebar';
import Logo from 'components/Logo';
import Avatar from 'components/Avatar';
import ThemeSwitcher from 'components/ThemeSwitcher';
import LanguageSwitcher from 'components/LanguageSwitcher';

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

    const [open, setOpen] = useState<boolean>(false);

    const {
        prefetchOnHover,
    } = usePrefetch();

    const { navigate } = useNavigation();

    return (
        <AppBar
            position='fixed'
            scrolling={scrolling}
            className='z-50 py-4 h-auto bg-dark rounded-b-2xl shadow-none dark:bg-dark-600'
        >
            <Box className='size-full grid grid-cols-3 items-center px-4'>
                <Search/>
                <Box className='h-full flex items-center gap-x-1'>
                    <Logo/>
                </Box>
                <Box className='ml-auto flex items-center gap-x-3'>
                    <Drawer onOpenChange={(o) => setOpen(o)}>
                        <DrawerTrigger>
                            <Avatar
                                size='md'
                                selected={open}
                                fallback='profile'
                                src='/images/logo.png'
                            />
                        </DrawerTrigger>
                        <DrawerContent className='h-full'>
                            <Box className='size-full flex flex-col p-4'>
                                <Titlebar
                                    className='p-0 pb-4'
                                    renderStart={() => <DrawerTitle className='font-nunito font-bold leading-5'>Menu</DrawerTitle>}
                                    renderEnd={() => (
                                        <Box className='ml-auto flex items-center gap-x-4'>
                                            <ThemeSwitcher/>
                                            <LanguageSwitcher/>
                                        </Box>
                                    )}
                                />
                                <Box className={cn(
                                    'flex flex-row items-center py-3 gap-x-3'
                                )}>
                                    <Avatar
                                        size='xxxl'
                                        src='images/logo.svg'
                                        fallback='Profile'
                                    />
                                    <Box className='flex flex-col'>
                                        <Text>Hola!</Text>
                                        <Text className='text-sm leading-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, praesentium.</Text>
                                    </Box>
                                </Box>
                                <Button
                                    block
                                    mobile
                                    role='link'
                                    rounded='full'
                                    color='primary'
                                    variant='contained'
                                    onClick={() => navigate('/sign-in')}
                                    onTouchStart={() => prefetchOnHover('/sign-in')}
                                >
                                    Iniciar sesion
                                </Button>
                            </Box>
                        </DrawerContent>
                    </Drawer>
                </Box>
            </Box>
        </AppBar>
    );
}

export default HeaderMobile;
