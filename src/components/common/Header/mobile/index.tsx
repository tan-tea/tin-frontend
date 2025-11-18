'use client'

import type {
    FC
} from 'react';

import dynamic from 'next/dynamic';

import { cn, getValueInitials } from 'lib/utils';

import { useNavigation, usePrefetch } from 'shared/hooks';

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
import { AvatarFallback, AvatarImage, AvatarRoot } from 'ui/avatar';

import type {
    HeaderProps
} from 'common/Header';

import Logo from 'components/Logo';
import Titlebar from 'common/Titlebar';
import ThemeSwitcher from 'components/ThemeSwitcher';
import LanguageSwitcher from 'components/LanguageSwitcher';

const LocationButton = dynamic(
    () => import('common/buttons/LocationButton'),
);

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
                <LocationButton/>
                <Box className='h-full flex items-center gap-x-1'>
                    <Logo/>
                </Box>
                <Box className='ml-auto flex items-center gap-x-3'>
                    <Drawer>
                        <DrawerTrigger>
                            <AvatarRoot size='md' className='cursor-pointer'>
                                <AvatarFallback>
                                    {getValueInitials('profile')}
                                </AvatarFallback>
                            </AvatarRoot>
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
                                    <AvatarRoot size='xxxl' className='shrink-0'>
                                        <AvatarImage
                                            fill={false}
                                            alt='logo'
                                            src='images/logo.svg'
                                            height={40}
                                            width={40}
                                        />
                                    </AvatarRoot>
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
                                    color='secondary'
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
