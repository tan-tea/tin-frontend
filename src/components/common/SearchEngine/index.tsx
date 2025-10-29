'use client'

import {
    useRef,
    useState,
    Fragment,
    type FC,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { useTranslations } from 'next-intl';

import { useComputedStyle } from 'shared/hooks';

import { Box } from 'ui/index';

import SearchEngineBox from './Box';

export const searchEngine = tv({
    slots: {
        portal: 'relative size-full top-1 p-4',
    },
});

export type SearchEngineVariants = VariantProps<typeof searchEngine>;

export type SearchEngineProps = SearchEngineVariants & {
    onFocus?: () => void;
};

const SearchEngine: FC<SearchEngineProps> = (
    props: SearchEngineProps,
) => {
    const {
        onFocus,
    } = props;

    const t = useTranslations('search');

    const boxRef = useRef<HTMLLabelElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [focus, setFocus,] = useState<boolean>(false);

    const elementComputedStyle = useComputedStyle(boxRef?.current!);
    const parentComputedStyle = useComputedStyle(boxRef.current?.parentElement!);

    const {
        portal,
    } = searchEngine();

    const boxHeight = parseFloat(elementComputedStyle?.height ?? '0');
    const parentWidth = parseFloat(parentComputedStyle?.width ?? '0');
    const parentHeight = parseFloat(parentComputedStyle?.height ?? '0');
    const paddingLeft = parseFloat(parentComputedStyle?.paddingLeft ?? '0');

    return (
        <Fragment>
            <SearchEngineBox
                focus={focus}
                onFocus={() => onFocus && onFocus()}
                setFocus={setFocus}
                placeholder={t('placeholder')}
                boxRef={boxRef}
                inputRef={inputRef}
            />
            {focus && (
                <Box
                    className={portal()}
                    style={{
                        left: `-${paddingLeft}px`,
                        width: `${parentWidth}px`,
                        height: `${parentHeight - boxHeight}px`,
                    }}
                >
                    Holaaaa
                </Box>
            )}
        </Fragment>
    );
}

export default SearchEngine;
