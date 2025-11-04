'use client'

import {
    FC,
    memo,
    ReactNode,
} from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootDialog,
    DialogProps as RootDialogProps,
} from '@mui/material/Dialog';

import {
    DialogTitle,
    DialogContent,
    DialogActions,
} from 'ui/index';

const dialog = tv({
    slots: {
        base: '',
        papper: 'shadow-sm rounded-lg bg-white dark:bg-dark-600',
        container: '',
    }
});

const {
    base,
    papper,
    container,
} = dialog();

type DialogVariants = VariantProps<typeof dialog>;

type DialogProps = DialogVariants & Pick<
    RootDialogProps,
    'id'
    | 'className'
    | 'open'
    | 'onClose'
    | 'maxWidth'
    | 'disableEscapeKeyDown'
> & {
    title?: string;
    content?: ReactNode;
    actions?: ReactNode;
};

const Dialog: FC<DialogProps> = (props: DialogProps) => {
    const {
        title,
        content,
        actions,
        className,
        ...rest
    } = props;

    return (
        <RootDialog
            keepMounted
            fullWidth
            maxWidth='lg'
            scroll='body'
            {...rest}
            className={base({
                className,
            })}
            slotProps={{
                paper: {
                    className: papper(),
                },
                container: {
                    className: container(),
                },
            }}
        >
            {title && <DialogTitle>{title}</DialogTitle>}
            {content && <DialogContent>{content}</DialogContent>}
            {actions && <DialogActions>{actions}</DialogActions>}
        </RootDialog>
    );
};

export default memo(Dialog);
