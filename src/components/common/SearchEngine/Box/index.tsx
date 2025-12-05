'use client'

import {
    useId,
    type FC,
    type RefObject,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { motion, MotionNodeAnimationOptions } from 'motion/react';

import {
    Box,
    Input,
} from 'ui/index';
import { Icon, Search, } from 'icons/index';

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
    onFocus?: () => void;
    onBlur?: () => void;
    setFocus: (value: boolean) => void;
};

const SearchEngineBox: FC<SearchBoxEngineProps> = (
    props: SearchBoxEngineProps,
) => {
    'use memo'
    const {
        focus,
        setFocus,
        onFocus,
        onBlur,
        boxRef,
        inputRef,
        placeholder,
    } = props;

    const {
        box,
        input,
        icon,
    } = searchEngineBox({ focus, });

    const searchId = useId();

    const animation: MotionNodeAnimationOptions = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: focus ? 1.02 : 1,
        },
        transition: {
            type: 'spring',
            duration: 0.3,
        },
    };

    return (
        <Box
            {...animation}
            id={searchId}
            ref={boxRef}
            role='searchbox'
            whileTap={{ scale: 1.05 }}
            component={motion.label}
            className={box()}
            onFocus={() => {
                setFocus(true);
                if (onFocus) onFocus?.();
            }}
            onBlur={() => {
                setFocus(false)
                if (onBlur) onBlur?.();
            }}
        >
            <Icon
                value={Search}
                className={icon()}
            />
            <Input
                type='search'
                ref={inputRef}
                className={input()}
                aria-describedby={searchId}
                placeholder={placeholder}
            />
        </Box>
    );
}

export default SearchEngineBox;
