'use client'

import {
    type FC,
} from 'react';

import {
    Box,
} from 'ui/index';

import { TermsProps, } from 'components/pages/terms';

import Section from 'common/Section';

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
            label=''
            description=''
            className='h-dvh overflow-hidden'
        >
            <Box className='size-full p-4'>
            </Box>
        </Section>
    );
};

export default TermsMobile;
