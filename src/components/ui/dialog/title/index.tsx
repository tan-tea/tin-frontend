'use client'

import {
    FC,
    memo,
} from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootDialogTitle,
    DialogTitleProps as RootDialogTitleProps,
} from '@mui/material/DialogTitle';

const dialogTitle = tv({
    base: 'font-bold font-secondary text-xl p-6 pb-4',
});

type DialogTitleVariants = VariantProps<typeof dialogTitle>;

type DialogTitleProps = DialogTitleVariants & RootDialogTitleProps;

const DialogTitle: FC<DialogTitleProps> = (props: DialogTitleProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootDialogTitle
            {...rest}
            children={children}
            className={dialogTitle({
                className,
            })}
        />
    );
};

export default memo(DialogTitle);
