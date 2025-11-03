'use client'

import {
    useState,
    type FC
} from 'react';
import Image from 'next/image';

import {
    Box,
    Text,
    AppBar,
    Dropdown,
} from 'ui/index';

import type {
    HeaderProps
} from 'common/Header';
import ThemeButton from 'common/ThemeButton';
import LanguageButton from 'common/LanguageButton';

const HeaderMobile: FC<HeaderProps> = (
    props: HeaderProps,
) => {
    const {
        shops,
        workspace,
        customization,
        scrolling,
    } = props;

    const [open, setOpen] = useState<boolean>(false);

    const defaultShop = shops?.find?.(s => s?.isPrimary);

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
                        src={workspace?.logo! ?? customization?.logo}
                        alt={workspace?.name!}
                        width={50}
                        height={50}
                        className='h-12 w-auto object-cover fill-[var(--mui-palette-primary-400)]'
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
                    {shops?.length > 0 && (
                        <Dropdown
                            option={{
                                label: defaultShop?.name!,
                                value: defaultShop?.id!,
                            }}
                            options={shops?.map(s => ({
                                label: s?.name,
                                value: s?.id,
                            }))}
                            open={open}
                            onOpenChange={(open) => setOpen(open)}
                            onSelectOption={(option) => console.log('selected', option)}
                        />
                    )}
                    <ThemeButton/>
                    <LanguageButton/>
                </Box>
            </Box>
        </AppBar>
    );
}

export default HeaderMobile;
