'use client'

import {
    Fragment,
    useEffect,
    useState,
    type FC,
} from 'react';
import { createPortal } from 'react-dom';

import { useDialog, } from 'shared/contexts/dialog';

type DialogManagerProps = object;

const DialogManager: FC<DialogManagerProps> = () => {
    'use memo'
    const { dialogs, } = useDialog();

    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // if (!mounted) return null;

    if (!dialogs || dialogs.length === 0) return null;

    return (
        <Fragment>
            {dialogs?.map?.((dialog, index) => {
                const {
                    Component: Dialog,
                    ...props
                } = dialog;

                if (!Dialog) return null;

                return createPortal(
                    <Dialog key={props?.id || index} {...props}/>,
                    document.body,
                );
            }
        )}
        </Fragment>
    );
};

export default DialogManager;
