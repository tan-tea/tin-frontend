'use client';

import type { FC } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { useState } from 'react';
import { tv,} from 'tailwind-variants';
import { useTranslations } from 'next-intl';

import {
    Box,
    IconButton,
} from 'ui/index';
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerTitle,
} from 'ui/drawer';
import {
    Icon,
    LayoutGrid,
} from 'icons/index';

import Titlebar from 'common/Titlebar';
import ThemeSwitcher from 'components/ThemeSwitcher';
import LanguageSwitcher from 'components/LanguageSwitcher';

import MenuList from './List';
import MenuFooter from './Footer';

const menu = tv({
    slots: {
        root: '',
    },
});

type MenuVariants = VariantProps<typeof menu>;

type MenuProps = MenuVariants;

const Menu: FC<MenuProps> = ({}) => {
    'use memo';
    const t = useTranslations();

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Drawer onOpenChange={(o) => setOpen(o)}>
            <DrawerTrigger selected={open}>
                <Icon value={LayoutGrid}/>
            </DrawerTrigger>
            <DrawerContent className='flex flex-col h-[90%]'>
                <Box className='p-4 flex-1 overflow-y-auto scrollbar-hide'>
                    <Titlebar
                        className='p-0 pb-4 mb-4'
                        renderStart={() => (
                            <DrawerTitle className='font-nunito font-bold leading-5'>
                                {t('menu')}
                            </DrawerTitle>
                        )}
                        renderEnd={() => (
                            <Box className='ml-auto flex items-center gap-x-4'>
                                <ThemeSwitcher/>
                                <LanguageSwitcher/>
                            </Box>
                        )}
                    />
                    <MenuList/>
                </Box>
                <Box className='mt-auto'>
                    <MenuFooter/>
                </Box>
            </DrawerContent>
        </Drawer>
    );
};

export default Menu;
