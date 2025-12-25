'use client'

import type { FC } from 'react';

import { Section } from 'ui/layout';

import type { TermsProps, } from 'pages/terms';

type SearchMobileProps = TermsProps;

const TermsMobile: FC<SearchMobileProps> = (
    props: SearchMobileProps
) => {
    'use memo'
    const {
        t,
        navigation,
    } = props;

    return (
        <Section
            aria-label=''
            aria-description=''
        >
            <div className='size-full p-4'>
            </div>
        </Section>
    );
};

export default TermsMobile;
