'use client'

import type { FC } from 'react';

import { useAtomValue } from 'jotai';

import { offerAtom } from 'shared/state';

import { Wrapper } from 'ui/layout';
import { Heading, Paragraph } from 'ui/text';

type Props = Readonly<object>;

const OfferDetailTitle: FC<Props> = () => {
    const currentOffer = useAtomValue(offerAtom);

    // TODO: return fallback.
    if (!currentOffer) return null;

    return (
        <Wrapper className='w-full h-auto'>
            <Heading className='text-2xl leading-6'>
                {currentOffer.title}
            </Heading>
            {currentOffer.category?.label && (
                <div className='flex-1 h-full flex items-center gap-x-1.5 flex-wrap mt-1'>
                    <Paragraph level='3'>{currentOffer.category.label}</Paragraph>
                </div>
            )}
        </Wrapper>
    );
};

export default OfferDetailTitle;
