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
    default as RootDialogActions,
    DialogActionsProps as RootDialogActionsProps,
} from '@mui/material/DialogActions';

const dialogActions = tv({
    base: 'p-4 pt-0 gap-x-2 md:pt-6 md:p-6',
});

type DialogActionsVariants = VariantProps<typeof dialogActions>;

type DialogActionsProps = DialogActionsVariants & RootDialogActionsProps;

const DialogActions: FC<DialogActionsProps> = (props: DialogActionsProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootDialogActions
            {...rest}
            children={children}
            className={dialogActions({
                className,
            })}
        />
    );
};

export default memo(DialogActions);
