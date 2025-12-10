'use client'

import type {
    FC,
    ComponentProps,
} from 'react';
import type { VariantProps } from 'tailwind-variants';

import { useId } from 'react';
import { tv } from 'tailwind-variants';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { cn } from 'lib/utils';

import {
    MapPin,
} from 'icons/index';

import MenuItem from 'common/Menu/Item';

const menuList = tv({
    slots: {
        root: cn(),
    },
    variants: {},
});

type MenuListVariants = VariantProps<typeof menuList>;

type MenuListProps = MenuListVariants;

const MenuList: FC<MenuListProps> = () => {
    'use memo'
    const uniqueId = useId();

    const t = useTranslations();

    const links: Array<ComponentProps<typeof MenuItem>> = [
        {
            href: '/location',
            label: t('location.tooltip'),
            isExternal: false,
            icon: MapPin,
        },
    ];

    return (
        <motion.div className={cn('w-full flex flex-col justify-center gap-y-4')}>
            {links?.map?.((link, index) => <MenuItem key={`${uniqueId}-${index}`} {...link}/>)}
        </motion.div>
    );
}

export default MenuList;
