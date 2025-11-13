'use client'

import {
    useState,
    type FC
} from 'react';

import Image from 'next/image';
import dynamic from 'next/dynamic';

import {
    Box,
    Text,
    AppBar,
    Dropdown,
} from 'ui/index';

import type {
    HeaderProps
} from 'common/Header';
import { AvatarFallback, AvatarImage, AvatarRoot } from 'ui/avatar';

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
                    <AvatarRoot size='md' className='cursor-pointer'>
                        <AvatarImage
                            fill={false}
                            width={32}
                            height={32}
                            alt='User'
                            src={'/images/logo.svg'}
                            className='object-fill'
                        />
                        <AvatarFallback/>
                    </AvatarRoot>
                </Box>
            </Box>
        </AppBar>
    );
}

export default HeaderMobile;
