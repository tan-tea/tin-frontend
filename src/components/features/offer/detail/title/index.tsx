'use client'

import type { FC } from 'react';

import { useId, useMemo } from 'react';

import type {
    Offer
} from 'shared/models';

import { Wrapper } from 'ui/layout';
import { Separator } from 'ui/separator';
import { Heading, Paragraph } from 'ui/text';

type OfferDetailTitleProps = Readonly<{ offer: Offer }>;

const OfferDetailTitle: FC<OfferDetailTitleProps> = ({
    offer,
}) => {
    const {
        title,
        category,
    } = offer;

    const uniqueId = useId();

    const displaySubTitles = useMemo<Array<string>>(
        () => {
            return [
                category?.label!
            ].filter(Boolean);
        },
        [category?.label],
    );

    return (
        <Wrapper className='w-full h-auto'>
            <Heading className='text-2xl leading-6'>
                {title}
            </Heading>
            <div className='flex-1 h-full flex items-center gap-x-1.5 flex-wrap mt-1'>
                {displaySubTitles.map((s, index) => (
                    s === 'separator'
                        ? <Separator key={`${uniqueId}-${s}-${index}`} orientation='vertical'/>
                        : <Paragraph key={`${uniqueId}-${s}-${index}`} className='text-base text-dark-600 dark:text-light-600'>{s}</Paragraph>
                ))}
            </div>
        </Wrapper>
    );
};

export default OfferDetailTitle;
