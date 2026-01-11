'use client'

import type { FC } from 'react';
import type { Variants } from 'motion/react';

import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import { useShallow } from 'zustand/shallow';
import { useFormatter, useTranslations } from 'next-intl';

import { useNavigation } from 'shared/hooks';
import { cartItemsCountAtom, cartItemsTotalPriceAtom } from 'shared/state';
import { useApplicationStore } from 'shared/stores/application-store';

import { Wrapper } from 'ui/layout';
import { IconButton } from 'ui/button';
import { Heading, Paragraph } from 'ui/text';
import { Icon, ShoppingCart } from 'components/icons';

type Props = Readonly<object>;

const variants: Variants = {
  pulse: {
    opacity: 1,
    scale: [1, 0.95, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
} as const;

const CartFloat: FC<Props> = () => {
    'use memo'
    const { navigate } = useNavigation();

    const { showBottomNavigation } = useApplicationStore(
        useShallow(store => store),
    );

    const t = useTranslations('Cart');
    const formatter = useFormatter();

    const cartItemsCount = useAtomValue(cartItemsCountAtom);
    const cartItemsTotalPrice = useAtomValue(cartItemsTotalPriceAtom);

    if (cartItemsCount === 0 || !showBottomNavigation) return null;

    return (
        <Wrapper
            position='fixed'
            direction='bottom'
            className='z-50 w-auto mb-4 h-auto'
        >
            <motion.div
                initial={{
                    opacity: 1,
                }}
                animate='pulse'
                variants={variants}
                className='size-full flex items-center gap-x-2 px-2 py-2 pr-4.5 rounded-full bg-light-600 dark:bg-dark-500 cursor-pointer'
                onClick={() => navigate('/cart')}
            >
                <div>
                    <IconButton color='primary'>
                        <Icon value={ShoppingCart}/>
                    </IconButton>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <Paragraph level='4'>
                        {t('items', { count: cartItemsCount })}
                    </Paragraph>
                    <Heading level='3' className='ml-auto font-primary-alt'>
                        ${formatter.number(cartItemsTotalPrice, {
                            currency: 'COP',
                            currencySign: 'standard',
                        })}
                    </Heading>
                </div>
            </motion.div>
        </Wrapper>
    );
}

export default CartFloat;
