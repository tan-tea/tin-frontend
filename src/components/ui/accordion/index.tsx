'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import {
    motion,
    AnimatePresence,
    MotionNodeAnimationOptions,
} from 'motion/react';
import { tv, cn } from 'tailwind-variants';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';

import { Heading } from 'ui/text';
import { TriggerButton } from 'ui/button';

const accordion = tv({
    slots: {
        root: cn('w-full flex flex-col justify-center box-border'),
        item: cn(
            'rounded-2xl',
            'bg-light-400 dark:bg-dark-300',
        ),
        header: cn('rounded-[inherit] m-0 text-base font-bold font-secondary'),
        trigger: cn(
            'px-4 py-4 box-border relative flex w-full gap-4 items-center justify-between font-[family:inherit] outline-none',
            'data-[panel-open]:rounded-b-none data-[panel-open]:border-b border-b-light-600 dark:border-b-dark-400',
        ),
        panel: cn(
            'flex-1 h-auto box-border p-4 pt-1.5',
            'data-[starting-style]:h-0 data-[ending-style]:h-0',
        ),
    },
    variants: {},
});

type AccordionVariants = VariantProps<typeof accordion>;

type AccordionProps = AccordionVariants
    & ComponentProps<typeof motion.div>
    & ComponentProps<typeof BaseAccordion.Root>;

export const Accordion: FC<AccordionProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { root } = accordion();

    return (
        <BaseAccordion.Root
            {...props}
            data-slot='accordion'
            className={root({
                className: className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
}

type AccordionItemProps = AccordionVariants
& ComponentProps<typeof motion.div>
& ComponentProps<typeof BaseAccordion.Item>;

const ACCORDION_ITEM_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        x: -9999,
    },
    animate: {
        x: 0,
    },
    transition: {
        duration: 0.85,
        ease: 'easeInOut',
    },
} as const;

export const AccordionItem: FC<AccordionItemProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { item } = accordion();

    return (
        <BaseAccordion.Item
            {...ACCORDION_ITEM_ANIMATION}
            {...props}
            data-slot='accordion-item'
            className={item({
                className: className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
}

type AccordionHeaderProps = AccordionVariants
    & ComponentProps<typeof Heading>
    & ComponentProps<typeof BaseAccordion.Header>;

export const AccordionHeader: FC<AccordionHeaderProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { header } = accordion();

    return (
        <BaseAccordion.Header
            {...props}
            data-slot='accordion-header'
            className={header({
                className: className as ClassValue,
            })}
            render={<Heading/>}
        />
    );
}

type AccordionTriggerProps = AccordionVariants
    & ComponentProps<typeof TriggerButton>
    & ComponentProps<typeof BaseAccordion.Trigger>;

export const AccordionTrigger: FC<AccordionTriggerProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { trigger } = accordion();

    return (
        <BaseAccordion.Trigger
            {...props}
            data-slot='accordion-trigger'
            className={trigger({
                className: className as ClassValue,
            })}
            render={<TriggerButton/>}
        />
    );
}

type AccordionPanelProps = AccordionVariants
& ComponentProps<typeof motion.div>
& ComponentProps<typeof BaseAccordion.Panel>;

const ACCORDION_PANEL_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        scale: 0,
        opacity: 0,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
    transition: {
        type: 'spring',
        duration: 1,
    },
} as const;

export const AccordionPanel: FC<AccordionPanelProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { panel } = accordion();

    return (
        <AnimatePresence>
            <BaseAccordion.Panel
                key='panel'
                {...ACCORDION_PANEL_ANIMATION}
                {...props}
                data-slot='accordion-panel'
                className={panel({
                    className: className as ClassValue,
                })}
                render={<motion.div/>}
            />
        </AnimatePresence>
    );
}
