'use client'

import type { FC } from 'react';
import type { ItemBySlugProps } from 'pages/item-by-slug';
import type { OptionGroups } from 'pages/item-by-slug/schemas';

import dynamic from 'next/dynamic';

import { toast } from 'sonner';
import { useMemo, useRef } from 'react';
import { useFormatter } from 'next-intl';
import { useAtomValue, useSetAtom } from 'jotai';
import { useForm, useFormState, useWatch } from 'react-hook-form';

import type {
    Offer,
    CartItem,
    CartItemOption,
} from 'shared/models';
import { addItemToCartAtom, cartAtom } from 'shared/state';
import { useComputedStyle, useNavigation } from 'shared/hooks';

import { Button } from 'ui/button';
import { Section, Wrapper } from 'ui/layout';

import Titlebar from 'common/titlebar';
import ExpandableText from 'common/expandable-text';
import BackButton from 'common/buttons/back-button';
import ShareButton from 'common/buttons/share-button';
import PriceWithDiscount from 'common/price-with-discount';

const OfferImage = dynamic(
    () => import('features/offer/detail/image'),
    {
        ssr: false,
    },
);

const OfferTitle = dynamic(
    () => import('features/offer/detail/title'),
    {
        ssr: false,
    },
);

const OfferOptionGroups = dynamic(
    () => import('features/offer/detail/option-groups'),
    {
        ssr: false,
    },
);

function calculateOfferTotalPrice(
  offer: Offer,
  selectedOptions?: Record<string, string[]>
) {
    let total = offer.price;

    if (!selectedOptions) return total;

    for (const group of offer.optionGroups) {
        const selected = selectedOptions[group.group.id] ?? [];

        for (const option of group.group.options) {
            if (selected.includes(option.id)) {
                total += option.priceDelta ?? 0;
            }
        }
    }

    return total;
};

type Props = ItemBySlugProps;

const ItemBySlugMobile: FC<Props> = ({
    t,
    offer,
    formControl,
}) => {
    'use memo'
    const formatter = useFormatter();

    const { navigate } = useNavigation();

    const {
        control,
        handleSubmit,
    } = useForm({
        formControl,
    });

    const { isValid } = useFormState({
        control,
    });

    const selectedOptions = useWatch({
        control,
        name: 'options',
    });

    const totalPrice = useMemo<number>(() => {
        return calculateOfferTotalPrice(offer, selectedOptions);
    }, [offer, selectedOptions]);

    const buttonRef = useRef<HTMLDivElement | null>(null);
    const buttonComputedStyle = useComputedStyle(buttonRef.current);

    const currentCart = useAtomValue(cartAtom);
    const addToCart = useSetAtom(addItemToCartAtom);

    const onSubmit = (data: OptionGroups) => {
        if (!isValid) {
            toast.error('Invalid form, please fix to continue');
            return;
        }

        const cartItemId = crypto.randomUUID();

        let options: Array<CartItemOption> = [];
        for (const [key, value] of Object.entries(data.options)) {
            const selectedGroup = offer.optionGroups.find(o => o.group.id === key);
            if (!selectedGroup) continue;

            for (const option of selectedGroup.group.options) {
                if (!value.includes(option.id)) continue;

                options.push({
                    id: crypto.randomUUID(),
                    cartItemId,
                    optionId: option.id,
                    optionGroupId: key,
                    optionGroupName: selectedGroup.group.name,
                    optionName: option.name,
                    price: option.priceDelta,
                });
            }
        }

        const newItem: CartItem = {
            id: cartItemId,
            cartId: currentCart.id,
            offerId: offer.id,
            offerTitle: offer.title,
            basePrice: offer.price,
            quantity: 1,
            totalPrice,
            createdAt: new Date(),
            options,
        };

        addToCart(newItem);
        toast.success(`${offer.title} añadido al carrito.`);
        navigate('/cart');
    }

    const disabled = !isValid;
    const offerDescription = offer.description ?? t('notProvided');
    const marginFromButtonPx = `${parseFloat(buttonComputedStyle?.height ?? '0') * 2}px`;

    return (
        <Section
            aria-label={offer.title}
            aria-description={offer?.description}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Titlebar
                    position='absolute'
                    renderStart={() => (<div><BackButton/></div>)}
                    renderEnd={() => (
                        <div className='ml-auto'>
                            <ShareButton shareableItem={{
                                heading: offer?.title,
                                description: offer?.description,
                            }}/>
                        </div>
                    )}
                />
                <OfferImage/>
                <div
                    className='relative size-full flex flex-col gap-y-4 p-4'
                    style={{ marginBottom: marginFromButtonPx, }}
                >
                    <PriceWithDiscount
                        size='lg'
                        orientation='vertical'
                        price={offer?.price}
                        discount={offer?.discount}
                    />
                    <OfferTitle/>
                    <ExpandableText text={offerDescription}/>
                    <OfferOptionGroups control={control}/>
                </div>
                <Wrapper
                    ref={buttonRef}
                    className='fixed bottom-0 left-0 w-full h-auto p-4 bg-light-400 dark:bg-dark-300'
                >
                    <Button
                        type='submit'
                        {...(!disabled && {
                            animate: {
                                opacity: 1,
                                scale: [1,  0.95, 1],
                            },
                            transition: {
                                scale: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: 'easeInOut',
                                },
                            },
                        })}
                        disabled={disabled}
                        className='flex-col'
                    >
                        {t('button')}
                        <span className='font-alternative text-sm'>
                            {formatter.number(totalPrice, {
                                currency: 'COP',
                            })}
                        </span>
                    </Button>
                </Wrapper>
            </form>
        </Section>
    );
};

export default ItemBySlugMobile;
