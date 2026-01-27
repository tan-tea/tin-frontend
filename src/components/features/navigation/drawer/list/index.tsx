'use client'

import type { FC, ComponentProps } from 'react';

import { useId } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import {
    MapPin,
    UserPlus,
    ShoppingCart
} from 'components/icons';

import NavigationDrawerListItem from './item';

type NavigationDrawerListProps = object;

const NavigationDrawerList: FC<NavigationDrawerListProps> = () => {
    'use memo'
    const uniqueId = useId();

    const t = useTranslations();

    const links: Array<ComponentProps<typeof NavigationDrawerListItem>> = [
        {
            href: '/sign-up',
            label: 'Registrate', //TODO: use t
            isExternal: false,
            icon: UserPlus,
        },
        {
            href: '/cart',
            label: 'Carrito de compras', //TODO: use t
            isExternal: false,
            icon: ShoppingCart,
        },
        {
            href: '/location',
            label: t('location.tooltip'),
            isExternal: false,
            icon: MapPin,
        },
    ];

    return (
        <motion.div className='w-full flex flex-col justify-center gap-y-4'>
            {links?.map?.((link, index) => <NavigationDrawerListItem key={`${uniqueId}-${index}`} {...link}/>)}
        </motion.div>
    );
}

export default NavigationDrawerList;
