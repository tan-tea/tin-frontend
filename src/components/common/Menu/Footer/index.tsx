import type {
    FC
} from 'react';
import { useTranslations } from 'next-intl';

import { Link } from 'lib/i18n/navigation';

import {
    Box,
    Text,
} from 'ui/index';

type MenuFooterLink = {
    href: string;
    label: string;
}

type MenuFooterProps = object

const MenuFooter: FC<MenuFooterProps> = () => {
    'use memo'
    const t = useTranslations();

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

export default MenuFooter;
