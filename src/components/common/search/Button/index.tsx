'use client';

import type { FC } from 'react';

import { useTranslations, } from 'next-intl';

import {
    Box,
    Tooltip,
    IconButton,
} from 'ui/index';
import { Search } from 'components/icons';

type SearchButtonProps = {
    selected: boolean;
};

const SearchButton: FC<SearchButtonProps> = ({
    selected,
}) => {
    'use memo'
    const t = useTranslations('search');

    return (
        <Tooltip title={t('tooltip')}>
            <Box className='justify-self-start'>
                <IconButton
                    borderless
                    size='md'
                    selected={selected}
                    icon={Search}
                />
            </Box>
        </Tooltip>
    );
};

export default SearchButton;
