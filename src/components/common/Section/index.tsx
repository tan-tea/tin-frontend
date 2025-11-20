'use client'

import {
    useId,
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
    type VariantProps
} from 'tailwind-variants';
import { motion, MotionNodeAnimationOptions, } from 'motion/react';

import Box from 'ui/box';

const section = tv({
    base: 'relative min-h-[calc(100dvh-var(--spacing-header-mobile))]',
    variants: {
        clipContent: {
            true: 'overflow-hidden',
            false: 'overflow-scroll',
        },
    },
    defaultVariants: {
        clipContent: false,
    },
});

type SectionVariants = VariantProps<typeof section>;

type SectionProps = SectionVariants & {
    label: string;
    description: string;
    children: ReactNode;
    ref?: Ref<HTMLElement | null>;
    loading?: boolean;
    showAnimation?: boolean;
    animation?: MotionNodeAnimationOptions;
    className?: ClassValue;
};

const DEFAULT_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        scale: 0,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
    },
    transition: {
        type: 'spring',
        duration: 0.5,
    },
};

const Section: FC<SectionProps> = ({
    ref,
    label,
    description,
    loading,
    className,
    animation,
    children,
    clipContent = false,
    showAnimation = true,
}) => {
    'use memo'
    const uniqueId = useId();

    const innerRef = useRef<HTMLElement | null>(null);

    const refCallback: RefCallback<HTMLElement> = (node) => {
        innerRef.current = node;

        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node;
    }

    const animate = useMemo(
        () => ({
            ...DEFAULT_ANIMATION,
            ...animation,
        }),
        [animation, showAnimation,],
    );

    if (loading) return null;

    return (
        <Box
            id={uniqueId}
            {...(showAnimation && animate)}
            ref={refCallback}
            role='application'
            aria-label={label}
            aria-labelledby={uniqueId}
            aria-description={description}
            aria-describedby={uniqueId}
            component={motion.section}
            className={section({
                clipContent,
                className,
            })}
        >
            {children}
        </Box>
    );
};

Section.displayName = 'Section';

export default Section;
