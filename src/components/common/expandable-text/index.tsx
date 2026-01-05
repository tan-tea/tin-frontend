'use client'

import type { FC } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import {
    useId,
    useMemo,
    useState,
} from 'react';
import { tv } from 'tailwind-variants';
import { useTranslations } from 'next-intl';
import { motion, MotionNodeAnimationOptions, } from 'motion/react';

import { Wrapper } from 'ui/layout';
import { Paragraph } from 'ui/text';

const expandableText = tv({
    slots: {
        container: 'text-base overflow-hidden',
        text: 'leading-5',
        button: 'inline-block text-[var(--mui-palette-primary-main)] font-bold',
    },
    variants: {
        expanded: {
            true: {
                text: '',
            },
            false: {
                text: 'line-clamp-3',
            },
        },
    },
    defaultVariants: {},
});

type ExpandableTextVariants = VariantProps<typeof expandableText>;

type ExpandableTextProps = ExpandableTextVariants & {
    text: string;
    maxLength?: number;
    showAnimation?: boolean;
    isExpandable?: boolean;
    className?: ClassValue;
};

const EXPANDABLE_TEXT_ANIMATION: MotionNodeAnimationOptions = {
    transition: {
        type: 'spring',
        duration: 0.4,
        bounce: 0.15,
    },
} as const;

const ExpandableText: FC<ExpandableTextProps> = ({
    text,
    className,
    maxLength = 100,
    showAnimation = true,
    isExpandable = true,
}) => {
    'use memo'
    const uniqueId = useId();

    const [expanded, setExpanded] = useState<boolean>(false);

    const {
        container,
        text: textSlot,
        button,
    } = expandableText({ expanded, });

    const t = useTranslations('shared');

    const animate = useMemo<MotionNodeAnimationOptions>(
        () => ({
            ...EXPANDABLE_TEXT_ANIMATION,
            layout: true,
        }),
        [],
    );

    const expandable = useMemo<boolean>(
        () => isExpandable && text.length > maxLength,
        [text, maxLength,],
    );

    const displayText = useMemo<string>(
        () => (!expandable && !expanded) || (expanded && expandable)
                ? text
                : `${text.slice(0, maxLength)}...`,
        [text, maxLength, expanded, expandable,],
    );

    return (
        <Wrapper
            {...(showAnimation && animate)}
            id={uniqueId}
            layout
            aria-label={text}
            aria-description={text}
            className={container()}
        >
            <Paragraph
                aria-describedby={uniqueId}
                className={textSlot({
                    className,
                })}
            >
                {displayText}{' '}
                {expandable && (
                    <motion.button
                        type='button'
                        transition={{
                            type: 'tween',
                            duration: 0.25,
                        }}
                        className={button()}
                        onClick={() => setExpanded((prev) => !prev)}
                    >
                        {expanded ? t('showLess') : t('showMore')}
                    </motion.button>
                )}
            </Paragraph>
        </Wrapper>
    );
};

export default ExpandableText;
