'use client'

import type { FC } from 'react';

import {
    useRef,
    useState,
    useEffect,
} from 'react';
import { useTranslations } from 'next-intl';

import { cn } from 'lib/utils';

import { useNavigation } from 'shared/hooks';

import {
    Autocomplete,
    AutocompleteBackdrop,
    AutocompleteEmpty,
    AutocompleteGroup,
    AutocompleteGroupLabel,
    AutocompleteList,
    AutocompletePopup,
    AutocompletePortal,
    AutocompletePositioner,
    AutocompleteTrigger,
} from 'ui/autocomplete';

import SearchBox from './Box';
import SearchButton from './Button';

type SearchProps = object;

const Search: FC<SearchProps> = () => {
   'use memo'
    const t = useTranslations();

    const {
        router,
        searchParams,
    } = useNavigation();

    const searchTimeoutRef = useRef<number | null>(0);

    const [open, setOpen] = useState<boolean>(false);
    const [writing, setWriting,] = useState<boolean>(false);
    const [currentSearch, setCurrentSearch] = useState<string>(
        () => new URLSearchParams(window.location.search)
            ?.get('q') || ''
    );

    const handleSearch = (value: string) => setCurrentSearch(value);

    useEffect(() => {
        setWriting(true);
        searchTimeoutRef.current = window.setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (currentSearch) params.set('q', currentSearch);
            else params.delete('q');

            const search = params.toString();
            router.replace(`?${search}`);
            setWriting(false);
        }, 500);

        return () => {
            if (searchTimeoutRef.current) {
                window.clearTimeout(searchTimeoutRef.current);
                searchTimeoutRef.current = null;
            }
        }
    }, [currentSearch]);

    return (
        <Autocomplete
            open={open}
            value={currentSearch}
            onValueChange={handleSearch}
            onOpenChange={(o) => setOpen(o)}
        >
            <AutocompleteTrigger
                nativeButton={false}
                render={<span/>}
                className='block w-fit'
            >
                <SearchButton selected={open}/>
            </AutocompleteTrigger>
            <AutocompletePortal>
                <AutocompleteBackdrop/>
                <AutocompletePositioner
                    className={cn(
                        'w-full fixed mx-auto -translate-x-[5px] z-50',
                        'mt-20 transform-none'
                    )}
                    positionMethod='fixed'
                >
                    <AutocompletePopup className='w-[90%] top-0 mx-auto'>
                        <SearchBox label={t('search.placeholder')}/>
                        {currentSearch && (
                            <AutocompleteEmpty>
                                {writing ? t('typing') : t('noResults')}
                            </AutocompleteEmpty>
                        )}
                        <AutocompleteList>
                            {!currentSearch && !writing && (
                                <AutocompleteGroup>
                                    <AutocompleteGroupLabel>{t('search.recents')}</AutocompleteGroupLabel>
                                </AutocompleteGroup>
                            )}
                        </AutocompleteList>
                    </AutocompletePopup>
                </AutocompletePositioner>
            </AutocompletePortal>
        </Autocomplete>
    );
};

export default Search;
