'use client'

import type {
    FC,
    ReactNode,
    ComponentType,
    MouseEventHandler,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { LucideProps, } from 'lucide-react';

import { Box, } from 'ui/index';
import { BaseIcon, } from 'icons/index';

const bottomNavigationItem = tv({
    slots: {
        button: 'relative h-auto w-auto flex items-center gap-x-[6px] py-2 px-4 rounded-xl',
        icon: 'dark:text-light-400',
    },
    variants: {
        selected: {
            true: {
                icon: 'text-primary',
                button: 'text-primary font-bold',
            },
            false: {
                button: 'dark:text-light-600'
            }
        },
    },
});

type BottomNavigationItemVariants = VariantProps<typeof bottomNavigationItem>;

type BottomNavigationItemProps = BottomNavigationItemVariants & {
    Icon: ComponentType<LucideProps>;
    label: string;
    onClick: MouseEventHandler;
    children?: ReactNode;
};

const BottomNavigationItem: FC<BottomNavigationItemProps> = (
    props: BottomNavigationItemProps,
) => {
    const {
        Icon,
        label,
        onClick,
        selected,
        children,
    } = props;

    const {
        icon,
        button,
    } = bottomNavigationItem({ selected, });

    return (
        <Box className='justify-self-center'>
            <Box
                className={button({
                    className: 'relative z-20',
                })}
                onClick={onClick}
            >
                {<BaseIcon Icon={Icon} className={icon()}/>}
                {selected && label && (
                    <Box className='font-primary text-sm'>{label}</Box>
                )}
                {children}
            </Box>
        </Box>
    );
}

export default BottomNavigationItem;
