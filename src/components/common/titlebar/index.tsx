'use client'

import type {
    FC,
    ReactNode,
    RefCallback,
    ComponentProps,
} from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import { useRef } from 'react';
import { tv, cn } from 'tailwind-variants';
import { motion, MotionNodeAnimationOptions } from 'motion/react';

import { Paragraph } from 'ui/text';

const titlebar = tv({
    slots: {
        wrapper: cn(
            'top-0 w-full flex items-center gap-x-2 justify-start p-4 z-10 bg-white',
            'transition-transform duration-300 ease-in-out',
        ),
        text: 'max-w-[180px] font-semibold leading-5 text-[inherit] truncate',
    },
    variants: {
        border: {
            true: {
                wrapper: cn(
                    'border-b border-b-[var(--mui-palette-grey-100)]',
                    'dark:border-b-dark-300',
                ),
            },
            false: {
                wrapper: 'border-none',
            }
        },
        position: {
            relative: {
                wrapper: 'relative dark:bg-dark-600',
            },
            fixed: {
                wrapper: 'fixed bg-transparent border-none',
            },
        },
    },
    defaultVariants: {
        border: true,
        position: 'relative',
    },
});

type TitlebarVariants = VariantProps<typeof titlebar>;

type TitlebarProps = TitlebarVariants & ComponentProps<typeof motion.div> & {
    title?: string;
    className?: ClassValue;
    showAnimation?: boolean;
    renderStart?: (props: TitlebarProps) => ReactNode;
    renderCenter?: (props: TitlebarProps) => ReactNode;
    renderEnd?: (props: TitlebarProps) => ReactNode;
};

const TITLEBAR_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        y: -20,
        visibility: 'hidden',
        opacity: 0,
    },
    animate: {
        y: 0,
        visibility: 'visible',
        opacity: 1,
    },
    transition: {
        type: 'spring',
        duration: 0.5,
    },
};

const Titlebar: FC<TitlebarProps> = (props) => {
    'use memo'
    const {
        ref,
        title,
        position,
        className,
        border,
        showAnimation = true,
        renderStart,
        renderCenter,
        renderEnd,
    } = props;

    const {
        text,
        wrapper,
    } = titlebar({
        border,
        position,
    });

    const innerRef = useRef<HTMLDivElement | null>(null);

    const refCallback: RefCallback<HTMLDivElement> = (node) => {
        innerRef.current = node;

        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node;
    }

    const hasRenderStart = !!renderStart;
    const hasRenderCenter = !!renderCenter;
    const hasRenderEnd = !!renderEnd;
    const shouldRenderTitle = title && !hasRenderCenter;
    const shouldRenderCenter = !title && hasRenderCenter;

    return (
        <motion.div
            {...(showAnimation && TITLEBAR_ANIMATION)}
            {...props}
            ref={refCallback}
            role='heading'
            aria-label={title}
            className={wrapper({
                className,
            })}
        >
            {hasRenderStart ? renderStart?.(props) : <motion.div/>}
            {shouldRenderTitle && <Paragraph className={text()}>{title}</Paragraph>}
            {shouldRenderCenter && renderCenter?.(props)}
            {(!shouldRenderTitle && !shouldRenderCenter) && <motion.div/>}
            {hasRenderEnd ? renderEnd?.(props) : <motion.div/>}
        </motion.div>
    );
}

export default Titlebar;
