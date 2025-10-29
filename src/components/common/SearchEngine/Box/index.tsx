'use client'

import type {
    FC,
    RefObject,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { motion } from 'motion/react';

import {
    Box,
    Input,
} from 'ui/index';
import { BaseIcon, Search, } from 'icons/index';

export const searchEngineBox = tv({
    slots: {
        box: 'flex flex-1 items-center gap-x-2 border border-gray-600 px-4 py-2 rounded-xl',
        input: 'text-sm w-full',
        icon: 'text-gray-600',
    },
    variants: {
        focus: {
            true: {
                box: 'border-[var(--mui-palette-primary-main)]',
                icon: 'text-[var(--mui-palette-primary-main)]',
                input: 'text-black',
            },
        },
    }
});

export type SearchEngineBoxVariants = VariantProps<typeof searchEngineBox>;

export type SearchBoxEngineProps = SearchEngineBoxVariants & {
    focus: boolean;
    placeholder: string;
    boxRef: RefObject<HTMLLabelElement | null>;
    inputRef: RefObject<HTMLInputElement | null>;
    onFocus: () => void;
    setFocus: (value: boolean) => void;
};

const SearchEngineBox: FC<SearchBoxEngineProps> = (
    props: SearchBoxEngineProps,
) => {
    const {
        focus,
        setFocus,
        onFocus,
        boxRef,
        inputRef,
        placeholder,
    } = props;

    const {
        box,
        input,
        icon,
    } = searchEngineBox({ focus, });

    return (
        <Box
            ref={boxRef}
            initial={{ scale: 0 }}
            animate={{ scale: focus ? 1.02 : 1 }}
            whileTap={{ scale: 1.05 }}
            transition={{ type: 'spring' }}
            component={motion.label}
            className={box()}
            onFocus={() => {
                setFocus(true);
                if (onFocus) onFocus?.();
            }}
            onBlur={() => setFocus(false)}
        >
            <BaseIcon
                Icon={Search}
                className={icon()}
            />
            <Input
                type='search'
                ref={inputRef}
                className={input()}
                placeholder={placeholder}
            />
        </Box>
    );
}

export default SearchEngineBox;
