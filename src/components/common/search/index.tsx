'use client'

import type { FC } from 'react';

import { useState } from 'react';
import {
    useForm,
    Controller,
    useWatch,
} from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from 'use-debounce';
import { useTranslations } from 'next-intl';

import { cn } from 'lib/utils';

import { primaryShopAtom, shopAtom } from 'shared/state';

import { InternalLink } from 'ui/link';
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

import { useSearchOffersData } from 'pages/search/hooks';
import { SearchIn, searchInSchema } from 'pages/search/schemas';

import SearchBox from './box';
import SearchButton from './button';

type Props = Readonly<object>;

const WAIT_IN_MS = 1000;

const Search: FC<Props> = () => {
   'use memo'
    const t = useTranslations();

    const shop = useAtomValue(shopAtom);
    const primaryShop = useAtomValue(primaryShopAtom);

    const shopId = shop?.id ?? primaryShop?.id;

    if (!shopId) return null;

    const { slug } = useParams<{ slug: string }>();

    const [ open, setOpen ] = useState<boolean>(false);

    const { control } = useForm<SearchIn>({
        resolver: zodResolver(searchInSchema()),
        mode: 'all',
        reValidateMode: 'onChange',
        values: {
            query: '',
        },
    });

    const { query = '' } = useWatch({ control });

    const [ debouncedQuery ] = useDebounce(query, WAIT_IN_MS);

    const {
        offers,
        isLoading,
    } = useSearchOffersData({ query: debouncedQuery, shopId, })

    const isTyping = query !== debouncedQuery;
    const noResults = !isTyping && !isLoading && offers && offers.length === 0;
    const showEmpty = query && isTyping && !noResults;

    if (!shop) return <div/>;

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
                            positionMethod='fixed'
                            className={cn(
                                'w-full fixed mx-auto -translate-x-[5px] z-50',
                                'mt-20 transform-none'
                            )}
                        >
                            <AutocompletePopup className='w-[90%] top-0 mx-auto'>
                                <SearchBox label={t('search.placeholder')}/>
                                {showEmpty && (
                                    <AutocompleteEmpty>
                                        {isTyping && t('typing')}
                                        {!isTyping && isLoading && 'Loading'}
                                        {noResults && t('noResults')}
                                    </AutocompleteEmpty>
                                )}
                                <AutocompleteList>
                                    {offers && offers?.map?.((offer) => (
                                        <AutocompleteItem key={offer.slug}>
                                            <InternalLink href={`./${slug}/item/${offer.slug}` as any}>
                                                {offer.title}
                                            </InternalLink>
                                        </AutocompleteItem>
                                    ))}
                                    {/* {!query && !isLoading && (
                                        <AutocompleteGroup>
                                            <AutocompleteGroupLabel>{t('search.recents')}</AutocompleteGroupLabel>
                                        </AutocompleteGroup>
                                    )} */}
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

