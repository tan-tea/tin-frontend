'use client'

import {
    FC,
    memo,
} from 'react';
import {
    default as RootAppBar,
    AppBarProps as RootAppBarProps,
} from '@mui/material/AppBar';
import { tv, } from 'tailwind-variants';

type PickedRootAppBarProps = 'position'
| 'className'
| 'children';

type AppBarProps = Pick<RootAppBarProps, PickedRootAppBarProps>;

const appBar = tv({
    base: 'w-full overflow-hidden',
});

const AppBar: FC<AppBarProps> = (props: AppBarProps) => {
    const {
        children,
        position,
        className,
        ...rest
    } = props;

    return <RootAppBar
        className={appBar({
            className,
        })}
        position={position}
        children={children}
    />;
};

export default memo(AppBar);
