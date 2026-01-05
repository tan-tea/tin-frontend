'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import { useMemo, useRef } from 'react';
import { useFormatter } from 'next-intl';
import { useForm, useFormState, useWatch } from 'react-hook-form';

import { clientEnv } from 'env/client';

import type {
    Offer
} from 'shared/models';
import { useComputedStyle } from 'shared/hooks';

import { Button } from 'ui/button';
import { Section, Wrapper } from 'ui/layout';

import type { ItemBySlugProps } from 'pages/item-by-slug';

import Titlebar from 'common/titlebar';
import BackButton from 'common/buttons/back-button';
import ShareButton from 'components/common/buttons/share-button';
import ExpandableText from 'common/expandable-text';
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

    const {
        control,
        handleSubmit,
    } = useForm({
        formControl,
    });

    const formState = useFormState({
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

    // const handleClick: MouseEventHandler = () => {
    //     const translated = t('message', { name: offer?.title });
    //     const message = encodeURIComponent(translated);
    //     const target = new URL(`https://wa.me/${clientEnv.NEXT_PUBLIC_WORKSPACE_NUMBER}?text=${message}`);
    //     window.open(target, '_blank');
    // }

    const onSubmit = (data: any) => {
        console.log('submit', data);
    }

    const disabled = !formState.isValid;
    const offerDescription = offer.description ?? t('notProvided');
    const marginFromButtonPx = `${parseFloat(buttonComputedStyle?.height ?? '0') * 2}px`;

    console.log('formState', formState);

    return (
        <Section
            aria-label={offer.title}
            aria-description={offer?.description}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Titlebar
                    position='absolute'
                    renderStart={() => (
                        <div>
                            <BackButton/>
                        </div>
                    )}
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
                <Wrapper ref={buttonRef} className='fixed bottom-0 left-0 w-full h-auto p-4 bg-light-400 dark:bg-dark-300'>
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
