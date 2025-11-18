'use client'

import {
    type FC,
} from 'react';

import {
    Box,
} from 'ui/index';

import { SearchProps, } from 'feature/Search';

import Search from 'common/Search';
import Section from 'common/Section';

type SearchMobileProps = SearchProps;

const SearchMobile: FC<SearchMobileProps> = (
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
                <Search/>
            </Box>
        </Section>
    );
};

export default SearchMobile;
