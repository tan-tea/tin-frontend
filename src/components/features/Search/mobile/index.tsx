'use client'

import {
    type FC,
} from 'react';

import {
    Box,
} from 'ui/index';

import { SearchProps, } from 'feature/Search';

import SearchEngine from 'common/SearchEngine';

type SearchMobileProps = SearchProps;

const SearchMobile: FC<SearchMobileProps> = (
    props: SearchMobileProps
) => {
    const {
        t,
        navigation,
    } = props;

    return (
        <Box
            component='section'
            className='h-dvh bg-inherit overflow-hidden'
        >
            <Box className='size-full p-4'>
                <SearchEngine onFocus={() => console.log('focused')}/>
            </Box>
        </Box>
    );
};

export default SearchMobile;
