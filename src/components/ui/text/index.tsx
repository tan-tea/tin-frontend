'use client'

import type { FC, ReactNode, ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { Fragment } from 'react';
import { tv, cn } from 'tailwind-variants';
import { motion, MotionNodeAnimationOptions } from 'motion/react';

import { Icon } from 'components/icons';

const TEXT_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        opacity: 0,
        y: 8,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    transition: {
        duration: 0.35,
        ease: 'easeInOut',
    },
} as const;

const text = tv({
    slots: {
        root: cn('text-base font-normal m-0 p-0 text-inherit'),
        heading: cn('block font-secondary font-bold'),
        paragraph: cn('block font-primary-alt text-normal truncate'),
        iconLabel: cn('grid grid-cols-[auto_1fr] items-center gap-x-2 ml-0'),
        label: '',
    },
    variants: {
        level: {
            '1': {
                heading: cn('text-2xl leading-8 md:text-3xl'),
                paragraph: cn('text-[20px] leading-[22px]')
            },
            '2': {
                heading: cn('text-xl leading-6 md:text-2xl'),
                paragraph: cn('text-[18px] leading-[20px]')
            },
            '3': {
                heading: cn('text-lg leading-6 md:text-xl'),
                paragraph: cn('text-base leading-[18px]')
            },
            '4': {
                heading: cn('text-base leading-4 md:text-lg'),
                paragraph: cn('text-sm leading-4'),
            },
            '5': {
                heading: cn('text-sm leading-3.5 md:text-base'),
                paragraph: cn('text-xs leading-3.5'),
            },
            '6': {
                heading: cn('text-xs leading-2.5 md:text-sm'),
                paragraph: cn('text-[10px] leading-[12px]')
            },
        },
        color: {
            normal: {
                heading: 'text-dark-600 dark:text-light-400',
                paragraph: 'text-dark-600 dark:text-light-400',
            },
            primary: {
                heading: 'text-[var(--mui-palette-primary-main)]',
                paragraph: 'text-[var(--mui-palette-primary-main)]',
                // iconLabel: 'text-[var(--mui-palette-primary-main)] [&>svg]:text-[var(--mui-palette-primary-main)]'
                iconLabel: '[&>svg]:text-[var(--mui-palette-primary-main)]'
            },
            dark: {
                heading: 'text-dark-600',
                paragraph: 'text-dark-600',
                iconLabel: '[&>svg]:text-dark-600',
            },
            light: {
                heading: 'text-light-400',
                paragraph: 'text-light-400',
                iconLabel: '[&>svg]:text-light-400',
            }
        },
        through: {
            true: {
                root: 'line-through',
                heading: 'line-through',
                paragraph: 'line-through',
            },
            false: {
                root: 'no-underline',
                heading: 'no-underline',
                paragraph: 'no-underline',
            },
        },
        truncate: {
            true: {
                heading: 'truncate',
                paragraph: 'truncate',
            },
            false: {
                heading: 'text-clip',
                paragraph: 'text-clip',
            },
        },
    },
    defaultVariants: {
        through: false,
        color: 'normal',
        truncate: false,
    },
});

type TextVariants = VariantProps<typeof text>;

type HeadingProps = TextVariants & ComponentProps<typeof motion.h1>;

const headingLevelMap = {
    '1': motion.h1,
    '2': motion.h2,
    '3': motion.h3,
    '4': motion.h4,
    '5': motion.h5,
    '6': motion.h6,
} as const;

const Heading: FC<HeadingProps> = ({
    level = '2',
    color = 'normal',
    className,
    through,
    ...props
}) => {
    'use memo'
    const { heading } = text();

    const Wrapper = Object.hasOwn(headingLevelMap, level)
        ? headingLevelMap?.[level]
        : headingLevelMap?.['1'];

    return (
        <Wrapper
            {...TEXT_ANIMATION}
            {...props}
            role='heading'
            aria-label={props.children?.toString()}
            data-slot={`text-heading-${level}`}
            className={heading({
                level,
                className,
                color,
                through,
            })}
        />
    );
};

Heading.displayName = 'Heading';

type ParagraphProps = TextVariants & ComponentProps<typeof motion.p>;

const Paragraph: FC<ParagraphProps> = ({
    level = '4',
    color,
    through,
    className,
    ...props
}) => {
    'use memo'
    const { paragraph } = text();

    return (
        <motion.p
            {...TEXT_ANIMATION}
            {...props}
            data-slot='text-paragraph'
            className={paragraph({
                className,
                level,
                color,
                through,
            })}
        />
    );
};

Paragraph.displayName = 'Paragraph';

type IconLabelProps = TextVariants & ComponentProps<typeof motion.div> & {
    icon: ComponentProps<typeof Icon>['value'];
    label: string;
};

const ICON_LABEL_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        y: -10,
        scale: 0.85,
    },
    animate: {
        y: 0,
        scale: 1,
    },
    exit: {
        y: 10,
        scale: 0,
    },
    transition: {
        y: {
            type: 'spring',
            duration: 0.35,
        },
        scale: {
            type: 'spring',
            duration: 0.25,
            delay: 0.35,
        },
    },
} as const;

const IconLabel: FC<IconLabelProps> = ({
    icon: Icon,
    label,
    className,
    ...props
}) => {
    'use memo'
    const { iconLabel } = text({ ...props });

    return (
        <motion.div
            {...ICON_LABEL_ANIMATION}
            {...props}
            data-slot='text-icon-label'
            className={iconLabel({
                className,
            })}
        >
            <Icon className='size-6'/>
            <Paragraph truncate={false}>{label}</Paragraph>
        </motion.div>
    );
};

IconLabel.displayName = 'IconLabel';

type RichTextTag = 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'b'

type RichTextProps = {
    children(tags: Record<RichTextTag, (chunks: ReactNode) => ReactNode>): ReactNode;
};

const RichText: FC<RichTextProps> = ({
    children,
}) => {
    'use memo'

    return (
        <Fragment>
            {children({
                h1: (chunks) => <Heading level='1' className='font-alternative'>{chunks}</Heading>,
                h2: (chunks) => <Heading level='2' className='font-alternative'>{chunks}</Heading>,
                h3: (chunks) => <Heading level='3' className='font-alternative'>{chunks}</Heading>,
                h4: (chunks) => <Heading level='4' className='font-alternative'>{chunks}</Heading>,
                h5: (chunks) => <Heading level='5' className='font-alternative'>{chunks}</Heading>,
                h6: (chunks) => <Heading level='6' className='font-alternative'>{chunks}</Heading>,
                p: (chunks) => <Paragraph level='3'>{chunks}</Paragraph>,
                b: (chunks) => <b className='font-bold'>{chunks}</b>,
            })}
        </Fragment>
    );
};

RichText.displayName = 'RichText';

export {
    Heading,
    Paragraph,
    IconLabel,
    RichText,
};
