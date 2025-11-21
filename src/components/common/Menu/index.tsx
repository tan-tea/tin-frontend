'use client';

import {
    useState,
    type FC
} from 'react';
import { useTranslations } from 'next-intl';

import { cn, } from 'lib/utils';
import { Link } from 'lib/i18n/navigation';

import {
    usePrefetch,
    useNavigation,
} from 'shared/hooks';

import {
    Box,
    Text,
    Button,
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

type MenuFooterLink = {
    href: string;
    label: string;
}

type MenuFooterProps = {
    t: ReturnType<typeof useTranslations>;
}

const MenuFooter: FC<MenuFooterProps> = ({
    t,
}) => {
    'use memo'

    const links: Array<MenuFooterLink> = [
        {
            href: '/privacy',
            label: t('privacyPolicy'),
        },
        {
            href: '/terms',
            label: t('termsOfService'),
        },
    ];

    const currentYear = new Date().getFullYear();

    return (
        <Box className='flex flex-col gap-y-1 p-4 text-sm dark:text-light-600'>
            <Text className='text-xs text-center'>
                &copy; {currentYear} - {t('allRightsReserved')}
            </Text>
            <Box className='flex flex-wrap items-center justify-center gap-x-2'>
                {links?.length > 0 && links?.map?.(link => (
                    <Link
                        key={link.label}
                        className='text-[var(--mui-palette-primary-main)] underline'
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                ))}
            </Box>
        </Box>
    );
}

type MenuProps = object;

const Menu: FC<MenuProps> = ({}) => {
    'use memo';
    const t = useTranslations();

    const {
        prefetchOnHover,
    } = usePrefetch();

    const { navigate } = useNavigation();

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
                                Menu
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
                            <Text>Hola!</Text>
                            <Text className="text-sm leading-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                                praesentium.
                            </Text>
                        </Box>
                    </Box>
                    <Button
                        block
                        mobile
                        role="link"
                        rounded="full"
                        color="primary"
                        variant="contained"
                        onClick={() => navigate('/sign-in')}
                        onTouchStart={() => prefetchOnHover('/sign-in')}
                    >
                        Iniciar sesion
                    </Button>
                </Box>
                <Box className='mt-auto'>
                    <MenuFooter t={t}/>
                </Box>
            </DrawerContent>
        </Drawer>
    );
};

export default Menu;
