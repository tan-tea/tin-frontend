'use client'

import {
    useMemo,
    useRef,
    type FC,
    type Ref,
    type ReactNode,
    type RefCallback,
} from 'react';
import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';
import { motion, MotionNodeAnimationOptions } from 'motion/react';

import { cn } from 'lib/utils';

import {
    Box,
    Typography
} from 'ui/index';

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

type TitlebarProps = TitlebarVariants & {
    title?: string;
    ref?: Ref<HTMLDivElement>;
    className?: ClassValue;
    animation?: MotionNodeAnimationOptions;
    showAnimation?: boolean;
    renderStart?: (props: TitlebarProps) => ReactNode;
    renderCenter?: (props: TitlebarProps) => ReactNode;
    renderEnd?: (props: TitlebarProps) => ReactNode;
};

const DEFAULT_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    transition: {
        type: 'spring',
        duration: 1,
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
        animation,
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

    const animate = useMemo(
        () => ({
            ...DEFAULT_ANIMATION,
            ...animation,
        }),
        [animation, showAnimation,]
    );

    return (
        <Box
            {...(showAnimation && animate)}
            ref={refCallback}
            role='heading'
            aria-label={title}
            component={motion.div}
            className={wrapper({
                className,
            })}
        >
            {renderStart ? renderStart?.(props) : <motion.div/>}
            {title && !renderCenter
                ? <Typography className={text()}>{title}</Typography>
                : renderCenter && !title
                    ? renderCenter?.(props)
                    : !title && !renderCenter
                        ? <motion.div/>
                        : null
            }
            {renderEnd ? renderEnd?.(props) : <motion.div/>}
        </Box>
    );
}

export default Titlebar;
