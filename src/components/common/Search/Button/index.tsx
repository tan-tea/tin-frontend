'use client';

import type {
    FC,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Tooltip,
    IconButton,
} from 'ui/index';
import { Search } from 'icons/index';

type SearchButtonProps = {
    selected: boolean;
};

const SearchButton: FC<SearchButtonProps> = ({
    selected,
}) => {
    'use memo'
    const t = useTranslations('language');

    return (
        <Tooltip title={t('tooltip')}>
            <Box className='justify-self-start'>
                <IconButton
                    borderless
                    size='md'
                    selected={selected}
                    Icon={Search}
                />
            </Box>
        </Tooltip>
    );
};

export default SearchButton;
