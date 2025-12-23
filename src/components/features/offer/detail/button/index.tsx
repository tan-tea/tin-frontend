'use client'

import type { FC, Ref, MouseEventHandler } from 'react';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from 'ui/index';
import { Wrapper } from 'ui/layout';

type OfferDetailButtonProps = Readonly<{
    ref?: Ref<HTMLDivElement>;
    onClick: MouseEventHandler;
}>;

const OfferDetailButton: FC<OfferDetailButtonProps> = ({
    ref,
    onClick,
}) => {
    'use memo'
    const t = useTranslations('productDetail');

    const innerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <Wrapper
            ref={ref}
            className='fixed bottom-0 left-0 w-full h-auto p-4 bg-light-400 dark:bg-dark-300'
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
        </Wrapper>
    );
};

export default OfferDetailButton;
