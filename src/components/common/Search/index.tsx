'use client'

import type {
    FC,
    ComponentProps,
} from 'react';

import dynamic from 'next/dynamic';

import { AutocompleteEmpty, AutocompleteList, AutocompletePopup, AutocompletePortal, AutocompletePositioner, AutocompleteRoot, } from 'ui/autocomplete';

const SearchBox = dynamic(
    () => import('./Box'),
);

type SearchProps = ComponentProps<typeof AutocompleteRoot> & {

};

const Search: FC<SearchProps> = (props) => {
    'use memo'
    const {} = props;

    const handleSearch = (value: string) => {
        console.log('value', value);
    };

    return (
        <AutocompleteRoot
            onValueChange={handleSearch}
        >
            <SearchBox label='Hola'/>
            <AutocompletePortal>
                <AutocompletePositioner align='start' sideOffset={4}>
                    <AutocompletePopup>
                        <AutocompleteEmpty>No items</AutocompleteEmpty>
                        <AutocompleteList></AutocompleteList>
                    </AutocompletePopup>
                </AutocompletePositioner>
            </AutocompletePortal>
        </AutocompleteRoot>
    );
};

export default Search;
