import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import {
    Box,
    Typography,
} from 'ui/index';
import { ExternalLink  } from 'ui/link';

type Link = {
    href: string;
    label: string;
}

type NavigationDrawerFooterProps = object

const NavigationDrawerFooter: FC<NavigationDrawerFooterProps> = () => {
    'use memo'
    const t = useTranslations();

    const links: Array<Link> = [
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
            <Typography className='text-xs text-center'>
                &copy; {currentYear} - {t('allRightsReserved')}
            </Typography>
            <Box className='flex flex-wrap items-center justify-center gap-x-2'>
                {links?.length > 0 && links?.map?.(link => (
                    <ExternalLink
                        key={link.label}
                        className='text-[var(--mui-palette-primary-main)] underline'
                        href={link.href}
                    >
                        {link.label}
                    </ExternalLink>
                ))}
            </Box>
        </Box>
    );
}

export default NavigationDrawerFooter;
