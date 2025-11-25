'use client';

import {
    useState,
    type FC
} from 'react';
import { useTranslations } from 'next-intl';

import { cn, } from 'lib/utils';
import { Link } from 'lib/i18n/navigation';

import {
    Box,
    Text,
} from 'ui/index';
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerTitle,
} from 'ui/drawer';

import Titlebar from 'common/Titlebar';
import Avatar from 'components/Avatar';
import ThemeSwitcher from 'components/ThemeSwitcher';
import LanguageSwitcher from 'components/LanguageSwitcher';

import MenuFooter from './Footer';

type MenuProps = object;

const Menu: FC<MenuProps> = ({}) => {
    'use memo';
    const t = useTranslations();

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Drawer onOpenChange={(o) => setOpen(o)}>
            <DrawerTrigger>
                <Avatar
                    size='md'
                    selected={open}
                    fallback='profile'
                />
            </DrawerTrigger>
            <DrawerContent className='flex flex-col h-[90%]'>
                <Box className='p-4 flex-1 flex-col overflow-y-auto scrollbar-hide'>
                    <Titlebar
                        className='p-0 pb-4'
                        renderStart={() => (
                            <DrawerTitle className='font-nunito font-bold leading-5'>
                                {t('menu')}
                            </DrawerTitle>
                        )}
                        renderEnd={() => (
                            <Box className='ml-auto flex items-center gap-x-4'>
                                <ThemeSwitcher />
                                <LanguageSwitcher />
                            </Box>
                        )}
                    />
                    <Box className={cn('flex flex-row items-center py-3 gap-x-3')}>
                        <Avatar size='xxxl' src='images/logo.svg' fallback='Profile'/>
                        <Box className='flex flex-col'>
                            <Text>{t('welcomeBack')}</Text>
                            <Link href={'/sign-in'} className="text-sm leading-4 text-[var(--mui-palette-primary-main)]">
                                {t('signIn')}
                            </Link>
                        </Box>
                    </Box>
                </Box>
                <Box className='mt-auto'>
                    <MenuFooter t={t}/>
                </Box>
            </DrawerContent>
        </Drawer>
    );
};

export default Menu;
