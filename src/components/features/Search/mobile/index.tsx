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
import SearchEngine from 'common/SearchEngine';

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
                {/* <SearchEngine
                    onFocus={() => console.log('focused')}
                /> */}
            </Box>
        </Section>
    );
};

export default SearchMobile;
