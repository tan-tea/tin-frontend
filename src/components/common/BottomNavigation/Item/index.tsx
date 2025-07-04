'use client'

import type {
    FC,
    ComponentType,
    MouseEventHandler,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { LucideProps, } from 'lucide-react';

import {
    Box,
    Button,
} from 'ui/index';

const bottomNavigationItem = tv({
    slots: {
        button: 'size-12',
        icon: 'size-6 text-gray-900 dark:text-gray-300',
    },
    variants: {
        selected: {
            true: {
                icon: 'text-primary',
                // button: 'bg-gradient-to-r from-primary via-secondary to-info',
            },
        },
    },
});

type BottomNavigationItemVariants = VariantProps<typeof bottomNavigationItem>;

type BottomNavigationItemProps = BottomNavigationItemVariants & {
    Icon: ComponentType<LucideProps>;
    onClick: MouseEventHandler;
};

const BottomNavigationItem: FC<BottomNavigationItemProps> = (
    props: BottomNavigationItemProps,
) => {
    const {
        Icon,
        onClick,
        selected,
    } = props;

    const {
        icon,
        button,
    } = bottomNavigationItem({ selected, });

    const iconProps: Omit<LucideProps, 'ref'> = {
        className: icon(),
        strokeWidth: 2,
        absoluteStrokeWidth: true,
    };

    return (
        <Box className='justify-self-center'>
            <Button
                size='large'
                color='primary'
                variant='text'
                rounded='lg'
                className={button()}
                onClick={onClick}
            >
                {<Icon {...iconProps}/>}
            </Button>
        </Box>
    );
}

export default BottomNavigationItem;
