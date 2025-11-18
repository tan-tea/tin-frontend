'use client'

import {
    useId,
    useMemo,
    useState,
    type FC,
} from 'react';
import {
    tv,
    type VariantProps
} from 'tailwind-variants';
import { motion, MotionNodeAnimationOptions, } from 'motion/react';
import { useTranslations } from 'next-intl';

import Box from 'ui/box';

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
};

const DEFAULT_ANIMATION: MotionNodeAnimationOptions = {
    transition: {
        type: 'spring',
        duration: 0.4,
        bounce: 0.15,
    },
};

const ExpandableText: FC<ExpandableTextProps> = ({
    text,
    maxLength = 100,
    showAnimation = true,
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
            ...DEFAULT_ANIMATION,
            layout: true,
        }),
        [],
    );

    const expandable = useMemo<boolean>(
        () => text.length > maxLength,
        [text, maxLength,],
    );

    const displayText = useMemo<string>(
        () => expanded
                ? text
                : `${text.slice(0, maxLength)}...`,
        [text, maxLength, expanded,],
    );

    return (
        <Box
            {...(showAnimation && animate)}
            id={uniqueId}
            layout
            role='article'
            aria-label={text}
            aria-description={text}
            component={motion.div}
            className={container()}
        >
            <Box
                aria-describedby={uniqueId}
                component={motion.p}
                className={textSlot()}
            >
                {displayText}{' '}
                {expandable && (
                    <Box
                        transition={{
                            type: 'tween',
                            duration: 0.25,
                        }}
                        component={motion.button}
                        className={button()}
                        onClick={() => setExpanded((prev) => !prev)}
                    >
                        {expanded ? t('showLess') : t('showMore')}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ExpandableText;
