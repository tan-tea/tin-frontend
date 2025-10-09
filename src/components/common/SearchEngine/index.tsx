'use client'

import type {
    FC,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';

import {
    Box,
    Input,
} from 'ui/index';

export const searchEngine = tv({
    slots: {
        box: 'flex flex-1 items-center border border-gray-200 px-4 py-2 rounded-lg',
        input: 'text-sm w-full',
    },
});

export type SearchEngineVariants = VariantProps<typeof searchEngine>;

export type SearchEngineProps = SearchEngineVariants & {

};

const SearchEngine: FC<SearchEngineProps> = (
    props: SearchEngineProps,
) => {
    const {} = props;

    const {
        box,
        input,
    } = searchEngine({ });

    return (
        <Box
            component='label'
            className={box()}
        >
            <Input
                className={input()}
                placeholder='Buscar productos, categorias'
            />
        </Box>
    );
}

export default SearchEngine;
