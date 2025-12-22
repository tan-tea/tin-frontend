'use client'

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import { Typography } from 'ui/index';
import { InternalLink } from 'ui/link';

type Link = {
    href: string;
    label: string;
}

type NavigationDrawerFooterProps = Readonly<object>;

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
        <div className='flex flex-col gap-y-1 p-4 text-sm dark:text-light-600'>
            <Typography className='text-xs text-center'>
                {t('allRightsReserved', {
                    currentYear,
                })}
            </Typography>
            <div className='flex flex-wrap items-center justify-center gap-x-2'>
                {links?.length > 0 && links?.map?.(link => (
                    <InternalLink
                        key={`${link.label}-${link.href}`}
                        className='text-[var(--mui-palette-primary-main)] underline'
                        href={link.href as any}
                    >
                        {link.label}
                    </InternalLink>
                ))}
            </div>
        </div>
    );
}

export default NavigationDrawerFooter;
