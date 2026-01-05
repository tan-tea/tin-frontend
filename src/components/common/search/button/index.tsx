'use client';

import type { FC } from 'react';

import { useTranslations, } from 'next-intl';

import {
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
            <div className='justify-self-start'>
                <IconButton
                    borderless
                    size='md'
                    selected={selected}
                    icon={Search}
                />
            </div>
        </Tooltip>
    );
};

export default SearchButton;
