import { ElementType, } from 'react';

export type DialogProps = {
    id?: string;
    open: boolean;
    onClose?: () => void;
    Component?: ElementType<Omit<DialogProps, 'Component'>>;
};
