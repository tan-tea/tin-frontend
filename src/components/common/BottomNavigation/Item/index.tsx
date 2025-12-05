'use client'

import type {
    FC,
    ReactNode,
    TouchEvent,
    ComponentType,
    MouseEventHandler,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { LucideProps, } from 'lucide-react';

import Box from 'ui/box';

const bottomNavigationItem = tv({
    slots: {
        button: 'relative h-auto w-auto flex items-center gap-x-[6px] py-2 px-4 rounded-xl',
        icon: '',
    },
    variants: {
        selected: {
            true: {
                icon: 'text-[var(--mui-palette-primary-main)]',
                button: 'text-[var(--mui-palette-primary-main)] font-bold',
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
    onTouch?: (event: TouchEvent, type: 'start' | 'end') => void;
    children?: ReactNode;
};

const BottomNavigationItem: FC<BottomNavigationItemProps> = (
    props: BottomNavigationItemProps,
) => {
    'use memo'
    const {
        Icon,
        label,
        onClick,
        onTouch,
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
                onTouchStart={(event) => onTouch && onTouch(event, 'start')}
                onTouchEnd={(event) => onTouch && onTouch(event, 'end')}
            >
                {selected && label && (
                    <Box className='font-primary text-sm'>{label}</Box>
                )}
                {children}
            </Box>
        </Box>
    );
}

export default BottomNavigationItem;
