'use client'

import type { FC } from 'react';

import z from 'zod';
import {
    useState,
    useEffect,
} from 'react';
import {
    useForm,
    Controller,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from 'use-debounce';
import { useTranslations } from 'next-intl';

import { cn } from 'lib/utils';

import { useNavigation } from 'shared/hooks';
import { useOffersCriteriaData } from 'shared/hooks/queries';

import {
    Autocomplete,
    AutocompleteBackdrop,
    AutocompleteEmpty,
    AutocompleteGroup,
    AutocompleteGroupLabel,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup,
    AutocompletePortal,
    AutocompletePositioner,
    AutocompleteTrigger,
} from 'ui/autocomplete';

import SearchBox from './Box';
import SearchButton from './Button';

type SearchProps = object;

const WAIT_IN_MS = 1000;

const SearchSchema = z.object({
    query: z.string(),
});

type SearchValues = z.infer<typeof SearchSchema>;

const Search: FC<SearchProps> = () => {
   'use memo'
    const t = useTranslations();

    const [open, setOpen] = useState<boolean>(false);

    const {
        router,
        searchParams,
    } = useNavigation();

    const {
        control,
        watch,
    } = useForm<SearchValues>({
        resolver: zodResolver(SearchSchema),
        mode: 'all',
        reValidateMode: 'onChange',
        values: {
            query: new URLSearchParams(window.location.search).get('q') ?? '',
        },
    });

    const query = watch('query');
    const [debouncedQuery] = useDebounce(query, WAIT_IN_MS);

    useEffect(() => {
        if (query === undefined) return;

        const params = new URLSearchParams(searchParams.toString());

        if (query) params.set('q', debouncedQuery);
        else params.delete('q');

        router.replace(`?${params.toString()}` as any);
    }, [query]);

    const {
        data,
        isLoading,
    } = useOffersCriteriaData(debouncedQuery);

    const isTyping = query !== debouncedQuery;
    const noResults = !isTyping && !isLoading && data && data.length === 0;

    return (
        <Controller
            name='query'
            control={control}
            render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                    {...field}
                    open={open}
                    onValueChange={(value) => onChange && onChange(value)}
                    onOpenChange={setOpen}
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
                                {query && (
                                    <AutocompleteEmpty>
                                        {isTyping && t('typing')}
                                        {!isTyping && isLoading && 'Loading'}
                                        {noResults && t('noResults')}
                                    </AutocompleteEmpty>
                                )}
                                <AutocompleteList>
                                    {data && data?.map?.((offer) => (
                                        <AutocompleteItem key={offer.slug}>
                                            {offer.title}
                                        </AutocompleteItem>
                                    ))}
                                    {!query && !isLoading && (
                                        <AutocompleteGroup>
                                            <AutocompleteGroupLabel>{t('search.recents')}</AutocompleteGroupLabel>
                                        </AutocompleteGroup>
                                    )}
                                </AutocompleteList>
                            </AutocompletePopup>
                        </AutocompletePositioner>
                    </AutocompletePortal>
                </Autocomplete>
            )}
        />
    );
};

export default Search;

