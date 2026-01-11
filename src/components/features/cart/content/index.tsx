'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import { toast } from 'sonner';
import { useAtomValue, useSetAtom } from 'jotai';
import { useFormatter, useTranslations } from 'next-intl';

import { clientEnv } from 'env/client';
import { checkoutTool } from 'lib/tools';

import {
    shopAtom,
    cartAtom,
    cartItemsCountAtom,
    cartItemsTotalPriceAtom,
    removeItemFromCartAtom,
} from 'shared/state';

import { Wrapper } from 'ui/layout';
import { Heading, Paragraph } from 'ui/text';
import { Button, IconButton } from 'ui/button';
import { Trash } from 'components/icons';

import PriceWithDiscount from 'common/price-with-discount';

type Props = Readonly<object>;

const CartContent: FC<Props> = () => {
    'use memo'
    const t = useTranslations('Cart');
    const format = useFormatter();

    const shop = useAtomValue(shopAtom);
    const cart = useAtomValue(cartAtom);
    const cartItemsCount = useAtomValue(cartItemsCountAtom);
    const cartItemsTotalPrice = useAtomValue(cartItemsTotalPriceAtom);

    const removeItemFromCart = useSetAtom(removeItemFromCartAtom);

    const unavailable = cartItemsCount <= 0;

    const handleRemoveItemFromCart = (itemId: string) => {
        if (!itemId) return;

        if(removeItemFromCart) removeItemFromCart(itemId);
    };

    console.log('cart items', cart.items);

    const handleCheckout = async () => {
        if (unavailable) {
            toast.error(t('emptyCart'));
            return;
        }

        let rawMessage = [
            'Hola, quiero agendar el servicio de \n',
            cart.items.map(item => {
                const groupName = item.options.map(o => o.optionGroupName)?.[0] ?? null;

                return [
                    `${item.offerTitle} (${item.quantity})`,
                    groupName && `${groupName}: ${format.list(item.options.map(o => o.optionName))}`
                ].join('\n');
            }).join('\n\n'),
            `\n`,
            `Total (estimado): ${format.number(cartItemsTotalPrice, {
                currency: 'COP',
            })}`,
        ].join('\n');

        window.open(
            new URL(`https://api.whatsapp.com/send/?phone=${clientEnv.NEXT_PUBLIC_WORKSPACE_NUMBER}&text=${rawMessage}`),
            '_blank'
        );
    };

    return (
        <div className='relative size-auto flex flex-col overflow-x-hidden'>
            <div className='size-full flex flex-col gap-y-2 px-4 py-4'>
                <Paragraph>
                    {t('items', { count: cartItemsCount })}
                </Paragraph>
                <ul className='flex flex-col gap-y-4'>
                    {cart.items.map(item => {
                        const groupName = item.options.map(o => o.optionGroupName)?.[0] ?? null;

                        return (
                            <li key={item.id} className='flex items-center gap-x-2'>
                                <div className='grow flex flex-col gap-y-1'>
                                    <Heading level='3'>
                                        {item.offerTitle}
                                    </Heading>
                                    {item.options.length > 0 && (
                                        <Paragraph level='4'>
                                            <b>{groupName}</b>: {' '}
                                            {format.list(item.options.map(o => o.optionName))}
                                        </Paragraph>
                                    )}
                                    <PriceWithDiscount
                                        discount={0}
                                        price={item.totalPrice}
                                    />
                                </div>
                                <div>
                                    <IconButton
                                        color='primary'
                                        variant='outline'
                                        onClick={() => handleRemoveItemFromCart(item?.id)}
                                    >
                                        <Trash/>
                                    </IconButton>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Wrapper
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    opacity: {
                        delay: 1,
                        type: 'spring',
                        duration: 0.35,
                    },
                }}
                className='w-full z-10 fixed bottom-0 right-0 px-4 py-4 bg-light-400 dark:bg-dark-300'
            >
                <div className='flex items-center gap-x-2 mb-2'>
                    <Heading level='2'>
                        {t('total')}
                    </Heading>
                    <PriceWithDiscount
                        discount={0}
                        price={cartItemsTotalPrice}
                    />
                </div>
                <Button
                    type='button'
                    disabled={unavailable}
                    onClick={handleCheckout}
                >
                    {t('action')}
                </Button>
            </Wrapper>
        </div>
    );
};

export default CartContent;
