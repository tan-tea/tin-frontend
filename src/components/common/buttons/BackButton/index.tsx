'use client'

import type {
    FC,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { useTranslations, } from 'next-intl';
import { motion, MotionNodeAnimationOptions } from 'motion/react';

import { cn } from 'lib/utils';

import { useNavigation, } from 'shared/hooks';

import {
    Box,
    IconButton,
    Text,
} from 'ui/index';
import { MoveLeft, } from 'icons/index';

const backButton = tv({
    slots: {
        container: 'flex items-center gap-x-1 cursor-pointer',
        button: 'top-0 left-0 text-inherit',
        label: 'text-xs font-semibold text-inherit',
    },
    variants: {
        variant: {
            rounded: {
                container: cn(
                    'p-1 rounded-full',
                    'bg-white dark:bg-dark-600'
                ),
                button: 'text-dark-600 dark:text-light-600'
            },
            normal: {
                container: cn('text-dark-600 dark:text-light-600'),
            },
        },
    },
});

type BackButtonVariants = VariantProps<typeof backButton>;

type BackButtonProps = BackButtonVariants & {
    className?: string;
    showLabel?: boolean;
    showAnimation?: boolean;
};

const DEFAULT_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        transform: 'translateX(-100px)',
    },
    animate: {
        transform: 'translateX(0px)',
    },
    transition: {
        type: 'spring',
        duration: 2.5,
    },
}

const BackButton: FC<BackButtonProps> = ({
    className,
    showLabel = false,
    showAnimation = true,
    variant = 'normal',
}) => {
    'use memo'
    const {
        container,
        button,
        label,
    } = backButton({
        variant,
    });

    const t = useTranslations();

    const {
        back,
    } = useNavigation();

    return (
        <Box
            {...(showAnimation && DEFAULT_ANIMATION)}
            component={motion.div}
            className={container()}
            onClick={async () => await back()}
        >
            <IconButton
                size='md'
                borderless
                className={button({
                    className,
                })}
                icon={MoveLeft}
            />
            {showLabel && <Text className={label()}>{t('shared.back')}</Text>}
        </Box>
    );
};

export default BackButton;
