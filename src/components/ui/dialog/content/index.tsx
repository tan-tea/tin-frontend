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
    default as RootDialogContent,
    DialogContentProps as RootDialogContentProps,
} from '@mui/material/DialogContent';

const dialogContent = tv({
    base: 'p-6 pt-0',
});

type DialogContentVariants = VariantProps<typeof dialogContent>;

type DialogContentProps = DialogContentVariants & RootDialogContentProps;

const DialogContent: FC<DialogContentProps> = (props: DialogContentProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootDialogContent
            {...rest}
            children={children}
            className={dialogContent({
                className,
            })}
        />
    );
};

export default memo(DialogContent);
