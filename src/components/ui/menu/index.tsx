'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import { motion } from 'motion/react';
import { tv, cn } from 'tailwind-variants';
import { Menu as BaseMenu } from '@base-ui/react/menu';

import { Wrapper } from 'ui/layout';
import { TriggerButton } from 'ui/button';

const menu = tv({
    slots: {
        trigger: cn('flex items-center gap-x-1.5'),
        backdrop: cn(''),
        positioner: cn('outline-none z-[100]'),
        popup: cn(
            'box-border mt-2 p-2 rounded-md bg-[canvas] shadow-md',
            'data-[open]:bg-white border border-[var(--mui-palette-grey-50)]',
            'dark:data-[open]:bg-dark-500 dark:text-light-600 dark:border-none',
        ),
        arrow: cn(''),
        item: cn(
            'pl-2 pr-4 py-2 flex items-center gap-x-2.5 text-sm leading-5',
            'data-[disabled]:text-[var(--mui-palette-primary-main)]',
            'dark:data-[disabled]:text-[var(--mui-palette-primary-main)] dark:text-white',
        ),
        group: cn(''),
        groupLabel: cn('text-sm font-nunito font-bold leading-4'),
    },
    variants: {
        selected: {
            true: {
                item: cn('bg-[var(--mui-palette-primary-50)] dark:bg-[var(--mui-palette-primary-900)]'),
            },
            false: {
                item: '',
            },
        },
    },
});

type MenuVariants = VariantProps<typeof menu>;

type MenuProps = ComponentProps<typeof BaseMenu.Root>
& MenuVariants;

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
& ComponentProps<typeof TriggerButton>
& MenuVariants;

export const MenuTrigger: FC<MenuTriggerProps> = ({ ...props }) => {
    'use memo'
    const { trigger } = menu();

    return (
        <BaseMenu.Trigger
            {...props}
            data-slot='menu-trigger'
            render={<TriggerButton/>}
            className={trigger({
                className: props.className as ClassValue,
            })}
        />
    );
}

type MenuPortalProps = ComponentProps<typeof BaseMenu.Portal>
& MenuVariants;

export const MenuPortal: FC<MenuPortalProps> = ({ ...props }) => {
    'use memo'
    return (
        <BaseMenu.Portal
            {...props}
            data-slot='menu-portal'
        />
    );
}

type MenuBackdropProps = ComponentProps<typeof BaseMenu.Backdrop>
& MenuVariants;

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

type MenuPositionerProps = ComponentProps<typeof BaseMenu.Positioner>
& MenuVariants;

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

type MenuPopupProps = MenuVariants
    & ComponentProps<typeof BaseMenu.Popup>
    & ComponentProps<typeof Wrapper>;

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
            render={<Wrapper/>}
        />
    );
}

type MenuArrowProps = ComponentProps<typeof BaseMenu.Arrow>
& MenuVariants;

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

type MenuItemProps = ComponentProps<typeof BaseMenu.Item>
& MenuVariants;

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

type MenuGroupProps = ComponentProps<typeof BaseMenu.Group>
& MenuVariants;

export const MenuGroup: FC<MenuGroupProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { group } = menu();

    return (
        <BaseMenu.Group
            {...props}
            data-slot='menu-group'
            className={group({
                className: className as ClassValue,
            })}
        />
    );
}

type MenuGroupLabelProps = ComponentProps<typeof BaseMenu.GroupLabel>
& ComponentProps<typeof motion.span>
& MenuVariants;

export const MenuGroupLabel: FC<MenuGroupLabelProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { groupLabel } = menu();

    return (
        <BaseMenu.GroupLabel
            render={<motion.span/>}
            {...props}
            data-slot='menu-group-label'
            className={groupLabel({
                className: className as ClassValue,
            })}
        />
    );
}
