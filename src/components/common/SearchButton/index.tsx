'use client'

import { FC, } from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Button,
    Tooltip,
} from 'ui/index';
import { Search, } from 'icons/index';

type SearchButtonProps = object;

const SearchButton: FC<SearchButtonProps> = (
    props: SearchButtonProps
) => {
    const {} = props;

    const t = useTranslations('search');

    return (
        <Tooltip title={t('tooltip')}>
            <Box>
                <Button
                    size='large'
                    color='primary'
                    variant='text'
                    rounded='lg'
                    className='size-12'
                >
                    <Search
                        className='size-6 text-gray-600 dark:text-gray-300'
                        strokeWidth={2}
                        absoluteStrokeWidth
                    />
                </Button>
            </Box>
        </Tooltip>
    );
};

export default SearchButton;
