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
    default as RootModal,
    ModalProps as RootModalProps,
} from '@mui/material/Modal';

const modal = tv({
    base: '',
});

type ModalVariants = VariantProps<typeof modal>;

type ModalProps = ModalVariants & RootModalProps;

const Modal: FC<ModalProps> = (props: ModalProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootModal
            {...rest}
            children={children}
            className={modal({
                className,
            })}
        />
    );
};

export default memo(Modal);
