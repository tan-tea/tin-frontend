'use client'

import {
    FC,
    Fragment,
} from 'react';

import { useDialog, } from 'shared/contexts/dialog';

type DialogManagerProps = object;

const DialogManager: FC<DialogManagerProps> = (
    props: DialogManagerProps,
) => {
    const {} = props;

    const { dialogs, } = useDialog();

    return (
        <Fragment>
            {dialogs && dialogs?.map?.(({
                Component: Dialog,
                ...props
            }, index) => {
                if (!Dialog) return null;

                return (
                    <Dialog
                        key={props?.id || index}
                        {...props}
                    />
                );
            }
            )}
        </Fragment>
    );
};

export default DialogManager;
