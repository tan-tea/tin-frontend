'use client';

import type {
    FC,
    ComponentProps
} from 'react';
import { tv } from 'tailwind-variants';
import { motion } from 'motion/react';
import { Drawer as BaseDrawer } from 'vaul';

import { cn } from 'lib/utils';

const drawer = tv({
    slots: {
        overlay: cn('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-none'),
        content: cn(
            'group/drawer-content bg-white fixed z-50 flex h-auto flex-col border-[var(--mui-palette-grey-100)]',
            'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b',
            'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-8 data-[vaul-drawer-direction=bottom]:max-h-[85dvh] data-[vaul-drawer-direction=bottom]:rounded-t-2xl data-[vaul-drawer-direction=bottom]:border-t',
            'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm',
            'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
        ),
        contentToggle: cn('bg-[var(--mui-palette-grey-200)] mx-auto mt-2 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block'),
        header: cn(),
        footer: cn(),
        title: cn(
            'text-lg text-foreground font-semibold',
            'md:text-xl'
        ),
        description: cn(),
    },
});

const Drawer: FC<ComponentProps<typeof BaseDrawer.Root>> = ({ ...props }) => {
    return (
        <BaseDrawer.Root
            {...props}
            data-slot='drawer'
        />
    );
};

const DrawerTrigger: FC<ComponentProps<typeof BaseDrawer.Trigger>> = ({ ...props }) => {
    return (
        <BaseDrawer.Trigger
            {...props}
            data-slot='drawer-trigger'
        />
    );
}

const DrawerPortal: FC<ComponentProps<typeof BaseDrawer.Portal>> = ({ ...props }) => {
    return (
        <BaseDrawer.Portal
            {...props}
            data-slot='drawer-portal'
        />
    );
}

const DrawerClose: FC<ComponentProps<typeof BaseDrawer.Close>> = ({ ...props }) => {
    return (
        <BaseDrawer.Close
            {...props}
            data-slot='drawer-close'
        />
    );
}

const DrawerOverlay: FC<ComponentProps<typeof BaseDrawer.Overlay>> = ({
    className,
    ...props
}) => {
    'use memo'
    const { overlay } = drawer();

    return (
        <BaseDrawer.Overlay
            {...props}
            data-slot='drawer-overlay'
            className={overlay({
                className,
            })}
        />
    );
}

const DrawerContent: FC<ComponentProps<typeof BaseDrawer.Content>> = ({
    className,
    children,
    ...props
}) => {
    'use memo'
    const {
        content,
        contentToggle,
    } = drawer();

    return (
        <DrawerPortal>
            <DrawerOverlay/>
            <BaseDrawer.Content
                {...props}
                data-slot='drawer-content'
                className={content({
                    className,
                })}
            >
                <div className={contentToggle()}/>
                {children}
            </BaseDrawer.Content>
        </DrawerPortal>
    );
}

const DrawerHeader: FC<ComponentProps<typeof motion.div>> = ({
    className,
    ...props
}) => {
    'use memo'
    const { header } = drawer();

    return (
        <motion.div
            {...props}
            data-slot='drawer-header'
            className={cn('flex flex-col gap-1.5 p-4', className)}
        />
    );
}

const DrawerFooter: FC<ComponentProps<typeof motion.div>> = ({
    className,
    ...props
}) => {
    'use memo'
    const { footer } = drawer();

    return (
        <motion.div
            {...props}
            data-slot='drawer-footer'
            className={cn('mt-auto flex flex-col gap-2 p-4', className)}
        />
    );
}

const DrawerTitle: FC<ComponentProps<typeof BaseDrawer.Title>> = ({
    className,
    ...props
}) => {
    'use memo'
    const { title } = drawer();

    return (
        <BaseDrawer.Title
            {...props}
            data-slot='drawer-title'
            className={title({
                className,
            })}
        />
    );
}

const DrawerDescription: FC<ComponentProps<typeof BaseDrawer.Description>> = ({
    className,
    ...props
}) => {
    'use memo'
    const { description } = drawer();

    return (
        <BaseDrawer.Description
            {...props}
            data-slot='drawer-description'
            className={cn('text-muted-foreground text-sm', className)}
        />
    );
}

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
