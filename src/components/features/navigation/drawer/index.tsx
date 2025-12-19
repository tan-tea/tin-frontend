'use client';

import type { FC } from 'react';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Box } from 'ui/index';
import {
    Drawer,
    DrawerTitle,
    DrawerTrigger,
    DrawerContent,
} from 'ui/drawer';
import {
    Icon,
    LayoutGrid,
} from 'icons/index';

import Titlebar from 'common/Titlebar';
import ThemeSwitcher from 'components/theme-switcher';
import LanguageSwitcher from 'components/language-switcher';

import NavigationDrawerList from './list';
import NavigationDrawerFooter from './footer';

type NavigationDrawerProps = object;

const NavigationDrawer: FC<NavigationDrawerProps> = () => {
    'use memo';
    const t = useTranslations();

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Drawer onOpenChange={(o) => setOpen(o)}>
            <DrawerTrigger selected={open}>
                <Icon selected={open} value={LayoutGrid}/>
            </DrawerTrigger>
            <DrawerContent className='flex flex-col h-[90%]'>
                <Box className='p-4 flex-1 overflow-y-auto scrollbar-hide'>
                    <Titlebar
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{
                            type: 'spring',
                            ease: 'easeIn',
                            duration: 0.15,
                        }}
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
                    <NavigationDrawerList/>
                </Box>
                <Box className='mt-auto'>
                    <NavigationDrawerFooter/>
                </Box>
            </DrawerContent>
        </Drawer>
    );
};

export default NavigationDrawer;
