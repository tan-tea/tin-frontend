'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv, cn } from 'tailwind-variants';
import { motion, MotionNodeAnimationOptions } from 'motion/react';

const layout = tv({
    slots: {
        main: cn('box-border outline-none min-h-dvh'),
        section: cn('w-full min-h-dvh box-border outline-none scrollbar-hide md:scrollbar-default'),
        article: cn('box-border outline-none transition-colors'),
        wrapper: cn('w-full box-border outline-none'),
    },
    variants: {},
});

type LayoutVariants = VariantProps<typeof layout>;

type MainProps = LayoutVariants & ComponentProps<typeof motion.main>;

const MAIN_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        scale: 0,
        opacity: 0,
        y: -1028,
    },
    transition: {
        opacity: {
            type: 'decay',
            duration: 0.5,
            delay: 0.15,
        },
        default: {
            type: 'spring',
            duration: 0.35,
        },
    },
} as const;

const Main: FC<MainProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { main } = layout();

    return (
        <motion.main
            {...MAIN_ANIMATION}
            {...props}
            data-slot='layout-main'
            className={main({
                className,
            })}
        />
    );
};

type SectionProps = LayoutVariants & ComponentProps<typeof motion.section>;

const SECTION_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        opacity: 0,
        y: 12,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -12,
    },
    transition: {
        type: 'spring',
        stiffness: 180,
        damping: 22,
        mass: 0.8,
    },
} as const;

const Section: FC<SectionProps> = ({ className, ...props }) => {
    'use memo'
    const { section } = layout();

    return (
        <motion.section
            {...SECTION_ANIMATION}
            {...props}
            data-slot='layout-section'
            className={section({
                className,
            })}
        />
    );
};

type ArticleProps = LayoutVariants & ComponentProps<typeof motion.article>;

const ARTICLE_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        x: 50,
        scale: 0.85,
    },
    animate: {
        x: 0,
        scale: 1,
    },
    exit: {
        x: -50,
        scale: 0,
    },
    transition: {
        scale: {
            duration: 0.25,
            type: 'spring',
        },
        x: {
            duration: 0.5,
            delay: 0.25,
            type: 'spring',
        },
    },
} as const;

const Article: FC<ArticleProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { article } = layout();

    return (
        <motion.article
            role='article'
            {...ARTICLE_ANIMATION}
            {...props}
            data-slot='layout-article'
            className={article({
                className,
            })}
        />
    );
}

type WrapperProps = LayoutVariants & ComponentProps<typeof motion.div>;

const WRAPPER_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        scale: 0.85,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
    },
    exit: {
        scale: 0,
        opacity: 0,
    },
    transition: {
        opacity: {
            type: 'spring',
            duration: 0.25,
            delay: 0.35,
        },
        scale: {
            type: 'spring',
            duration: 0.15,
            delay: 0.35,
            stiffness: 500,
        },
    },
} as const;

const Wrapper: FC<WrapperProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { wrapper } = layout();

    return (
        <motion.div
            {...WRAPPER_ANIMATION}
            {...props}
            data-slot='layout-wrapper'
            className={wrapper({
                className,
            })}
        />
    );
}

export {
    Main,
    Section,
    Article,
    Wrapper,
};
