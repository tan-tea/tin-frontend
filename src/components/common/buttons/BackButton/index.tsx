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

import { useNavigation, } from 'shared/hooks';

import {
    Box,
    IconButton,
    Text,
} from 'ui/index';
import { MoveLeft, } from 'icons/index';

const backButton = tv({
    slots: {
        container: 'flex items-center gap-x-1 text-[var(--mui-palette-grey-800)] cursor-pointer dark:text-[var(--mui-palette-grey-200)]',
        button: 'top-0 left-0 text-inherit',
        label: 'text-xs font-semibold text-inherit',
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

const BackButton: FC<BackButtonProps> = (props) => {
    'use memo'
    const {
        className,
        showLabel = false,
        showAnimation = true,
    } = props;

    const {
        container,
        button,
        label,
    } = backButton();

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
