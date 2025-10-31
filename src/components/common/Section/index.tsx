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
    type VariantProps
} from 'tailwind-variants';
import { motion, MotionNodeAnimationOptions, } from 'motion/react';

import { Box } from 'ui/index';

const section = tv({
    base: 'relative min-h-dvh',
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
    ref?: Ref<Element | null>;
    loading?: boolean;
    showAnimation?: boolean;
    animation?: MotionNodeAnimationOptions;
    className?: ClassValue;
};

const DEFAULT_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        // transform: 'translateY(-100px)',
        scale: 0,
        opacity: 0,
    },
    animate: {
        // transform: 'translateY(0px)',
        scale: 1,
        opacity: 1,
    },
    transition: {
        type: 'spring',
        duration: 0.5,
    },
};

const Section: FC<SectionProps> = (props) => {
    const {
        ref,
        label,
        description,
        loading,
        className,
        animation,
        children,
        clipContent = false,
        showAnimation = true,
    } = props;

    if (loading) return null;

    const innerRef = useRef<Element | null>(null);

    const refCallback: RefCallback<Element> = (node) => {
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

    return (
        <Box
            {...(showAnimation && animate)}
            ref={refCallback}
            role='application'
            aria-label={label}
            aria-labelledby={label}
            aria-description={description}
            aria-describedby={description}
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
