'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import { tv, cn } from 'tailwind-variants';
import { motion } from 'motion/react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';

import { Wrapper } from 'ui/layout';
import { Heading, Paragraph } from 'ui/text';
import { Button, TriggerButton } from 'ui/button';

const dialog = tv({
    slots: {
        papper: 'shadow-sm rounded-lg bg-white dark:bg-dark-600', // TODO: remove
        trigger: cn(),
        portal: cn(''),
        backdrop: cn('fixed min-h-dvh inset-0 bg-dark-600 opacity-25 dark:opacity-50'),
        viewport: cn(),
        popup: cn('outline-none w-5/6 box-border bg-light-400 fixed top-1/2 left-1/2 -translate-1/2 rounded-2xl p-4 md:p-6 md:w-full md:max-w-lg dark:bg-dark-300'),
        title: cn('mb-2'),
        description: cn('mb-4'),
        close: cn(''),
    },
    variants: {},
});

type DialogVariants = VariantProps<typeof dialog>;

type DialogRootProps = DialogVariants & ComponentProps<typeof BaseDialog.Root>;

const DialogRoot: FC<DialogRootProps> = ({ ...props }) => {
    'use memo'

    return (
        <BaseDialog.Root
            {...props}
            data-slot='dialog-root'
        />
    );
};

DialogRoot.displayName = 'Dialog';

type DialogTriggerProps = DialogVariants
    & ComponentProps<typeof BaseDialog.Trigger>
    & ComponentProps<typeof TriggerButton>;

const DialogTrigger: FC<DialogTriggerProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { trigger } = dialog();

    return (
        <BaseDialog.Trigger
            {...props}
            data-slot='dialog-trigger'
            className={trigger({
                className: className as ClassValue,
            })}
            render={<TriggerButton/>}
        />
    );
};

DialogTrigger.displayName = 'DialogTrigger';

type DialogPortalProps = DialogVariants
    & ComponentProps<typeof BaseDialog.Portal>
    & ComponentProps<typeof motion.div>;

const DialogPortal: FC<DialogPortalProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { portal } = dialog();

    return (
        <BaseDialog.Portal
            {...props}
            data-slot='dialog-portal'
            className={portal({
                className: className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
};

DialogPortal.displayName = 'DialogPortal';

type DialogBackdropProps = DialogVariants
    & ComponentProps<typeof BaseDialog.Backdrop>
    & ComponentProps<typeof motion.div>;

const DialogBackdrop: FC<DialogBackdropProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { backdrop } = dialog();

    return (
        <BaseDialog.Backdrop
            {...props}
            data-slot='dialog-backdrop'
            className={backdrop({
                className: className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
};

DialogBackdrop.displayName = 'DialogBackdrop';

type DialogViewportProps = DialogVariants
    & ComponentProps<typeof BaseDialog.Viewport>
    & ComponentProps<typeof motion.div>;

const DialogViewport: FC<DialogViewportProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { viewport } = dialog();

    return (
        <BaseDialog.Viewport
            {...props}
            data-slot='dialog-viewport'
            className={viewport({
                className: className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
};

DialogViewport.displayName = 'DialogViewport';

type DialogPopupProps = DialogVariants
    & ComponentProps<typeof BaseDialog.Popup>
    & ComponentProps<typeof Wrapper>;

const DialogPopup: FC<DialogPopupProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { popup } = dialog();

    return (
        <BaseDialog.Popup
            {...props}
            data-slot='dialog-popup'
            className={popup({
                className: className as ClassValue,
            })}
            render={<Wrapper/>}
        />
    );
};

DialogPopup.displayName = 'DialogPopup';

type DialogTitleProps = DialogVariants
    & ComponentProps<typeof BaseDialog.Title>
    & ComponentProps<typeof Heading>;

const DialogTitle: FC<DialogTitleProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { title } = dialog();

    return (
        <BaseDialog.Title
            {...props}
            data-slot='dialog-title'
            className={title({
                className: className as ClassValue,
            })}
            render={<Heading/>}
        />
    );
};

DialogTitle.displayName = 'DialogTitle';

type DialogDescriptionProps = DialogVariants
    & ComponentProps<typeof BaseDialog.Description>
    & ComponentProps<typeof Paragraph>;

const DialogDescription: FC<DialogDescriptionProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { description } = dialog();

    return (
        <BaseDialog.Description
            {...props}
            data-slot='dialog-description'
            className={description({
                className: className as ClassValue,
            })}
            render={<Paragraph/>}
        />
    );
};

DialogDescription.displayName = 'DialogDescription';

type DialogCloseProps = DialogVariants
    & ComponentProps<typeof BaseDialog.Close>
    & ComponentProps<typeof Button>;;

const DialogClose: FC<DialogCloseProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { close } = dialog();

    return (
        <BaseDialog.Close
            {...props}
            data-slot='dialog-close'
            className={close({
                className: className as ClassValue,
            })}
            render={<Button/>}
        />
    );
};

DialogClose.displayName = 'DialogClose';

export {
    DialogRoot,
    DialogTrigger,
    DialogPortal,
    DialogBackdrop,
    DialogViewport,
    DialogPopup,
    DialogTitle,
    DialogDescription,
    DialogClose,
};
