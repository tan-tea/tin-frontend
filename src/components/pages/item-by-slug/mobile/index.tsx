'use client'

import type { FC, MouseEventHandler } from 'react';

import dynamic from 'next/dynamic';

import { useRef, useEffect } from 'react';

import { clientEnv } from 'env/client';

import {
    useScroll,
    useComputedStyle,
} from 'shared/hooks';

import { Typography } from 'ui/index';
import { ButtonRoot } from 'ui/button';
import { Section, Wrapper } from 'ui/layout';

import type { ItemBySlugProps } from 'pages/item-by-slug';

import Titlebar from 'common/titlebar';
import BackButton from 'common/buttons/back-button';
import ShareButton from 'common/buttons/ShareButton';
import ExpandableText from 'common/expandable-text';
import PriceWithDiscount from 'common/price-with-discount';

const OfferDetailImage = dynamic(
    () => import('features/offer/detail/image'),
    {
        ssr: false,
    },
);

const OfferDetailTitle = dynamic(
    () => import('features/offer/detail/title'),
    {
        ssr: false,
    },
);

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

    const marginFromButtonPx = `${parseFloat(buttonComputedStyle?.height ?? '0')}px`;

    return (
        <Section
            aria-label={t('title')}
            aria-description={offer?.description}
        >
            <Titlebar
                position='fixed'
                renderStart={() => <BackButton variant='rounded'/>}
                renderEnd={() => (
                    <div className='ml-auto bg-white p-1 rounded-full flex items-center gap-x-2'>
                        <ShareButton shareableItem={{
                            heading: offer?.title,
                            description: offer?.description,
                        }}/>
                    </div>
                )}
            />
            <OfferDetailImage alt={offer?.title || offer?.description} image={offer?.banner}/>
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
                <OfferDetailTitle offer={offer}/>
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
            <Wrapper ref={buttonRef} className='fixed bottom-0 left-0 w-full h-auto p-4 bg-light-400 dark:bg-dark-300'>
                <ButtonRoot
                    animate={{
                        opacity: 1,
                        scale: [1,  1.035, 1],
                    }}
                    transition={{
                        scale: {
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'mirror',
                            ease: 'easeInOut',
                        },
                    }}
                    onClick={handleClick}
                >
                    {t('button')}
                </ButtonRoot>
            </Wrapper>
        </Section>
    );
};

export default ItemBySlugMobile;
