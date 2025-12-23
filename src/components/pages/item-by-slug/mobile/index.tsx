'use client'

import type { FC, MouseEventHandler } from 'react';

import { useRef, useEffect } from 'react';

import { clientEnv } from 'env/client';

import {
    useScroll,
    useComputedStyle,
} from 'shared/hooks';

import { Section } from 'ui/layout';
import { Typography } from 'ui/index';

import type { ItemBySlugProps } from 'pages/item-by-slug';

import Titlebar from 'common/titlebar';
import BackButton from 'common/buttons/back-button';
import ShareButton from 'common/buttons/ShareButton';
import ExpandableText from 'common/expandable-text';
import PriceWithDiscount from 'common/price-with-discount';

import ProductDetailImage from 'components/pages/item-by-slug/components/ProductDetailImage';
import OfferDetailTittle from 'features/offer/detail/title';
import OfferDetailButton from 'features/offer/detail/button';

type ItemBySlugMobileProps = ItemBySlugProps;

const ItemBySlugMobile: FC<ItemBySlugMobileProps> = ({
    t,
    offer,
}) => {
    'use memo'
    const { scroll } = useScroll();

    const buttonRef = useRef<HTMLDivElement | null>(null);
    const buttonComputedStyle = useComputedStyle(buttonRef.current);

    const handleClick: MouseEventHandler = () => {
        const translated = t('message', { name: offer?.title });
        const message = encodeURIComponent(translated);
        const target = new URL(`https://wa.me/${clientEnv.NEXT_PUBLIC_WORKSPACE_NUMBER}?text=${message}`);
        window.open(target, '_blank');
    }

    useEffect(() => {
        const previousScroll = { ...scroll };
        window.scrollTo({ top: 0, behavior: 'smooth' });

        return () => {
            window.scroll(previousScroll.x, previousScroll.y);
        };
    }, []);

    return (
        <Section
            aria-label={t('title')}
            aria-description={t('title')}
        >
            <Titlebar
                position='relative'
                title={offer?.title}
                renderStart={({ title, }) => <BackButton showLabel={title ? false : true}/>}
                renderEnd={() => (
                    <div className='ml-auto flex items-center gap-x-2'>
                        <ShareButton shareableItem={{
                            heading: offer?.title,
                            description: offer?.description,
                        }}/>
                    </div>
                )}
            />
            <ProductDetailImage
                alt={offer?.title || offer?.description}
                image={offer?.banner}
            />
            <div
                className='relative size-full flex flex-col gap-y-4 p-4'
                style={{
                    marginBottom: `${parseFloat(buttonComputedStyle?.height ?? '0')}px`,
                }}
            >
                <PriceWithDiscount
                    size='lg'
                    orientation='vertical'
                    price={offer?.price}
                    discount={offer?.discount}
                />
                <OfferDetailTittle offer={offer}/>
                <ExpandableText text={offer?.description ?? t('notProvided')}/>
                {offer?.type?.attributes?.length! > 0 && (
                    <div className='relative flex flex-col justify-center gap-y-4'>
                        {offer?.type?.attributes?.map?.(attribute => (
                            <div
                                key={attribute?.id}
                                className='flex flex-col gap-y-1.5 shadow-xs px-4 py-2.5 rounded-xl border border-[var(--mui-palette-grey-50)] dark:border-dark-400'
                            >
                                <Typography className='text-sm font-semibold text-[var(--mui-palette-secondary-main)]'>
                                    {attribute?.name}
                                </Typography>
                                <div className='flex items-center gap-x-2'>
                                    {attribute?.values
                                        ?.filter(value => attribute?.isGlobal || value?.offerId === offer?.id)
                                        ?.map((value, index) => (
                                            <Typography
                                                key={index}
                                                className='p-2 py-1.5 text-xs rounded-full bg-[var(--mui-palette-grey-50)] text-dark-600 dark:bg-dark-400 dark:text-white'
                                            >
                                                {value?.label ?? value?.value}
                                            </Typography>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <OfferDetailButton
                ref={buttonRef}
                onClick={handleClick}
            />
        </Section>
    );
};

export default ItemBySlugMobile;
