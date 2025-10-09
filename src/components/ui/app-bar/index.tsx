'use client'

import {
    memo,
    type FC,
} from 'react';
import {
    default as RootAppBar,
    AppBarProps as RootAppBarProps,
} from '@mui/material/AppBar';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';

const appBar = tv({
    base: 'w-full overflow-hidden transition-transform duration-300 ease-in-out',
    variants: {
        scrolling: {
            true: '-translate-y-full',
            false: 'translate-y-0',
        },
    },
});

type AppBarVariants = VariantProps<typeof appBar>;

type PickedRootAppBarProps = 'position'
| 'className'
| 'children';

type AppBarProps = Pick<RootAppBarProps, PickedRootAppBarProps> & AppBarVariants;

const AppBar: FC<AppBarProps> = (props: AppBarProps) => {
    const {
        children,
        scrolling,
        position,
        className,
        ...rest
    } = props;

    return <RootAppBar
        className={appBar({
            scrolling,
            className,
        })}
        position={position}
    >
        {children}
    </RootAppBar>;
};

export default memo(AppBar);
