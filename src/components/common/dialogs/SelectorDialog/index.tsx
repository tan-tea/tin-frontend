'use client'

import type {
    FC,
    ReactNode,
} from 'react';

import {
    Dialog,
} from 'ui/index';

import { DialogProps, } from 'shared/contexts/dialog/types';

type SelectorDialogProps = Pick<DialogProps, 'open'> & {
    title: string;
    content: ReactNode;
    actions?: ReactNode;
    onClose: () => void;
};

const SelectorDialog: FC<SelectorDialogProps> = ({
    open,
    title,
    onClose,
    content,
    actions,
}) => {
    'use memo'

    return (
        <Dialog
            maxWidth='md'
            className='min-w-sm'
            onClose={onClose}
            open={open || false}
            title={title}
            content={content}
            actions={actions}
        />
    );
};

export default SelectorDialog;
