'use client';

import type { FC } from 'react';

import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import { cartItemsCountAtom } from 'shared/state';

import { Badge } from 'ui/badge';
import {
    Drawer,
    DrawerTitle,
    DrawerTrigger,
    DrawerContent,
} from 'ui/drawer';
import {
    Icon,
    LayoutGrid,
} from 'components/icons';

import Titlebar from 'common/titlebar';
import UserCard from 'features/user/card';
import ThemeSwitcher from 'components/theme-switcher';
import LanguageSwitcher from 'components/language-switcher';

import NavigationDrawerList from './list';
import NavigationDrawerFooter from './footer';

type Props = Readonly<object>;

const NavigationDrawer: FC<Props> = () => {
    'use memo';
    const t = useTranslations();

    const cartItemsCount = useAtomValue(cartItemsCountAtom);

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Drawer onOpenChange={(o) => setOpen(o)}>
            <DrawerTrigger selected={open} className='relative'>
                {cartItemsCount > 0 && (
                    <Badge className='absolute -top-2.5 -right-2.5'>
                        {cartItemsCount}
                    </Badge>
                )}
                <Icon selected={open} value={LayoutGrid}/>
            </DrawerTrigger>
            <DrawerContent className='flex flex-col h-[90%]'>
                <div className='p-4 flex-1 overflow-y-auto scrollbar-hide'>
                    <Titlebar
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{
                            type: 'spring',
                            ease: 'easeIn',
                            duration: 0.15,
                        }}
                        className='p-0 pb-4 mb-1.5'
                        renderStart={() => (
                            <DrawerTitle className='font-nunito font-bold leading-5'>
                                {t('menu')}
                            </DrawerTitle>
                        )}
                        renderEnd={() => (
                            <div className='ml-auto flex items-center gap-x-4'>
                                <ThemeSwitcher/>
                                <LanguageSwitcher/>
                            </div>
                        )}
                    />
                    <UserCard/>
                    <NavigationDrawerList/>
                </div>
                <div className='mt-auto'>
                    <NavigationDrawerFooter/>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default NavigationDrawer;
