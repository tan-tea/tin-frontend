'use client'

import type {
    FC
} from 'react';

import Image from 'next/image';
import dynamic from 'next/dynamic';

import {
    Box,
    Text,
    AppBar,
    Dropdown,
    Button,
} from 'ui/index';

import type {
    HeaderProps
} from 'common/Header';
import { AvatarFallback, AvatarImage, AvatarRoot } from 'ui/avatar';
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger
} from 'ui/drawer';
import { cn, getValueInitials } from 'lib/utils';
import Titlebar from 'common/Titlebar';
import { useNavigation, usePrefetch } from 'shared/hooks';

const ThemeButton = dynamic(
    () => import('common/buttons/ThemeButton'),
);

const LanguageButton = dynamic(
    () => import('common/buttons/LanguageButton'),
);

const LocationButton = dynamic(
    () => import('common/buttons/LocationButton'),
);

const HeaderMobile: FC<HeaderProps> = (
    props: HeaderProps,
) => {
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
            <Box className='size-full flex items-center px-4'>
                <Box className='h-full flex items-center gap-x-1'>
                    <Image
                        priority
                        quality={100}
                        src={workspace?.logo! ?? customization?.logo}
                        alt={workspace?.name!}
                        width={200}
                        height={50}
                        className='h-8 w-auto object-contain fill-[var(--mui-palette-primary-400)]'
                    />
                    {customization?.showName && (
                        <Text
                            component='h1'
                            className='text-base font-medium text-[var(--mui-palette-primary-main)]'>
                            {workspace?.name}
                        </Text>
                    )}
                </Box>
                <Box className='ml-auto flex items-center gap-x-3'>
                    {/* {shops?.length > 1 && (
                        <Dropdown
                            option={{
                                label: currentShop?.name!,
                                value: currentShop?.id!,
                            }}
                            options={shops?.map(s => ({
                                label: s?.name,
                                value: s?.id,
                            }))}
                            open={open}
                            onOpenChange={(open) => setOpen(open)}
                            onSelectOption={(option) => onSelectShop(option?.value)}
                        />
                    )} */}
                    <LocationButton/>
                    <ThemeButton/>
                    <LanguageButton/>
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
