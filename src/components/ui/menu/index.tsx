'use client'

import type {
    FC,
    ComponentProps,
} from 'react';
import { motion } from 'motion/react';
import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';
import { Menu as BaseMenu } from '@base-ui-components/react/menu';

import { cn } from 'lib/utils';

const menu = tv({
    slots: {
        trigger: cn(''),
        backdrop: cn(''),
        positioner: cn('outline-none z-[100]'),
        popup: cn(
            'box-border mt-2 p-0.5 rounded-md bg-[canvas] shadow-md',
            'data-[open]:bg-white border border-[var(--mui-palette-grey-50)] dark:data-[open]:bg-dark-500',
        ),
        arrow: cn(''),
        item: cn('px-4 py-2 flex text-sm leading-5 dark:text-white'),
    },
    variants: {
        selected: {
            true: {
                item: 'bg-[var(--mui-palette-primary-50)] dark:bg-[var(--mui-palette-primary-900)]',
            },
            false: {
                item: '',
            },
        },
    },
});

type MenuVariants = VariantProps<typeof menu>;

type MenuProps = ComponentProps<typeof BaseMenu.Root> & MenuVariants;

export const Menu: FC<MenuProps> = ({ ...props }) => {
    'use memo'
    return (
        <BaseMenu.Root
            {...props}
            data-slot='menu-root'
        />
    );
}

type MenuTriggerProps = ComponentProps<typeof BaseMenu.Trigger>
& ComponentProps<typeof motion.button>
& MenuVariants;

export const MenuTrigger: FC<MenuTriggerProps> = ({ ...props }) => {
    'use memo'
    const { trigger } = menu();

    return (
        <BaseMenu.Trigger
            {...props}
            data-slot='menu-trigger'
            render={<motion.button/>}
            className={trigger({
                className: props.className as ClassValue,
            })}
        />
    );
}

type MenuPortalProps = ComponentProps<typeof BaseMenu.Portal> & MenuVariants;

export const MenuPortal: FC<MenuPortalProps> = ({ ...props }) => {
    'use memo'
    return (
        <BaseMenu.Portal
            {...props}
            data-slot='menu-portal'
        />
    );
}

type MenuBackdropProps = ComponentProps<typeof BaseMenu.Backdrop> & MenuVariants;

export const MenuBackdrop: FC<MenuBackdropProps> = ({ ...props }) => {
    'use memo'
    const { backdrop } = menu();

    return (
        <BaseMenu.Backdrop
            {...props}
            data-slot='menu-backdrop'
            className={backdrop({
                className: props.className as ClassValue,
            })}
        />
    );
}

type MenuPositionerProps = ComponentProps<typeof BaseMenu.Positioner> & MenuVariants;

export const MenuPositioner: FC<MenuPositionerProps> = ({ ...props }) => {
    'use memo'
    const { positioner } = menu();

    return (
        <BaseMenu.Positioner
            sideOffset={4}
            {...props}
            data-slot='menu-positioner'
            className={positioner({
                className: props.className as ClassValue,
            })}
        />
    );
}

type MenuPopupProps = ComponentProps<typeof BaseMenu.Popup> & MenuVariants;

export const MenuPopup: FC<MenuPopupProps> = ({ ...props }) => {
    'use memo'
    const { popup } = menu();

    return (
        <BaseMenu.Popup
            {...props}
            data-slot='menu-popup'
            className={popup({
                className: props.className as ClassValue,
            })}
        />
    );
}

// type MenuContent = ComponentProps<typeof BaseMenu.Content> & MenuVariants;

// export const MenuContent: FC<MenuContent> = ({ ...props }) => {
//     'use memo'
//     const { } = menu();

//     return (
//         <MenuPortal>
//             <MenuPositioner>

//             </MenuPositioner>
//         </MenuPortal>
//     )
// }

type MenuArrowProps = ComponentProps<typeof BaseMenu.Arrow> & MenuVariants;

export const MenuArrow: FC<MenuArrowProps> = ({ ...props }) => {
    'use memo'
    const { arrow } = menu();

    return (
        <BaseMenu.Arrow
            {...props}
            data-slot='menu-arrow'
            className={arrow({
                className: props.className as ClassValue,
            })}
        />
    );
}

type MenuItemProps = ComponentProps<typeof BaseMenu.Item> & MenuVariants;

export const MenuItem: FC<MenuItemProps> = ({ ...props }) => {
    'use memo'
    const { item } = menu();

    return (
        <BaseMenu.Item
            {...props}
            data-slot='menu-item'
            className={item({
                className: props.className as ClassValue,
            })}
        />
    );
}
