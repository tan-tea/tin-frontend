'use client'

import {
    useRef,
    useState,
    Fragment,
    type FC,
} from 'react';
import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';

import { useComputedStyle } from 'shared/hooks';

import Box from 'ui/box';

const SearchEngineBox = dynamic(
    () => import('./Box'),
);

const SearchEnginePortal = dynamic(
    () => import('./Portal'),
);

type SearchEngineProps = {
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

    const elementComputedStyle = useComputedStyle(boxRef);
    const parentComputedStyle = useComputedStyle(boxRef);

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
                    className='relative size-full'
                    style={{
                        left: `-${paddingLeft}px`,
                        width: `${parentWidth}px`,
                        height: `${parentHeight - boxHeight}px`,
                    }}
                >
                    <SearchEnginePortal/>
                </Box>
            )}
        </Fragment>
    );
}

export default SearchEngine;
