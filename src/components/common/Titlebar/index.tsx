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

import {
    Box,
    Text
} from 'ui/index';

const titlebar = tv({
    slots: {
        wrapper: 'top-0 w-full flex items-center gap-x-2 justify-start p-4 z-10 bg-white dark:bg-dark-600 transition-transform duration-300 ease-in-out',
        text: 'max-w-[180px] font-semibold leading-5 text-[inherit] truncate',
    },
    variants: {
        border: {
            true: {
                wrapper: 'border-b border-b-[var(--mui-palette-grey-100)]',
            },
            false: {
                wrapper: 'border-none',
            }
        },
        position: {
            relative: {
                wrapper: 'relative',
            },
            fixed: {
                wrapper: 'fixed',
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
        // transform: 'translateY(-250px)',
        opacity: 0,
    },
    animate: {
        // transform: 'translateY(0px)',
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
        animation,
        showAnimation = true,
        renderStart,
        renderCenter,
        renderEnd,
    } = props;

    const {
        wrapper,
        text,
    } = titlebar({ position });

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
                ? <Text className={text()}>{title}</Text>
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
