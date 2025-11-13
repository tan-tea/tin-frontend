'use client'

import {
    useRef,
    type FC,
    type Ref,
    type MouseEventHandler,
} from 'react';
import {
    tv,
    type VariantProps
} from 'tailwind-variants';
import { motion, MotionNodeAnimationOptions } from 'motion/react';
import { useTranslations } from 'next-intl';

import { Box, Button } from 'ui/index';

const productDetailButton = tv({
    slots: {
        container: 'fixed bottom-0 left-0 w-full h-auto p-4 bg-[var(--mui-palette-grey-100)] dark:bg-dark-400',
    },
    variants: {},
    defaultVariants: {},
});

type ProductDetailButtonVariants = VariantProps<typeof productDetailButton>;

type ProductDetailButtonProps = ProductDetailButtonVariants & {
    ref?: Ref<HTMLDivElement>;
    onClick: MouseEventHandler;
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
        duration: 1.5,
    },
};

const ProductDetailButton: FC<ProductDetailButtonProps> = (props) => {
    const {
        ref,
        onClick,
    } = props;

    const {
        container,
    } = productDetailButton({ });

    const t = useTranslations('productDetail');

    const innerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <Box
            {...DEFAULT_ANIMATION}
            ref={ref}
            component={motion.div}
            className={container()}
        >
            <Button
                animate={{
                    scale: [1,  1.035, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                }}
                block
                mobile
                ref={innerRef}
                color='primary'
                size='large'
                rounded='full'
                variant='contained'
                startIcon={<></>}
                onClick={onClick}
            >
                {t('button')}
            </Button>
        </Box>
    );
};

export default ProductDetailButton;
