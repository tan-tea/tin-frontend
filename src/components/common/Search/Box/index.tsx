'use client'

import {
    useId,
    type FC,
    type Ref,
    type RefCallback,
    type ComponentProps,
} from 'react';
import { motion } from 'motion/react';
import { tv } from 'tailwind-variants';

import { AutocompleteInput } from 'ui/autocomplete';

const searchBox = tv({
    slots: {
        box: 'w-full flex flex-1 bg-white border border-[var(--mui-palette-grey-600)]/50 bg-[var(--mui-palette-grey-600)]/5 px-4 py-2 rounded-2xl dark:bg-dark-400 dark:border-none',
        input: 'text-base font-nunito dark:text-light-400',
    },
});

type SearchBoxProps = ComponentProps<typeof AutocompleteInput> & {
    label: string;
    labelRef?: Ref<HTMLLabelElement>;
};

const SearchBox: FC<SearchBoxProps> = (props) => {
    'use memo'
    const {
        label,
        labelRef,
        className,
        ...rest
    } = props;

    const {
        box,
        input,
    } = searchBox();

    const uniqueId = useId();

    const refCallback: RefCallback<HTMLLabelElement> = (node) => {
        if (typeof labelRef === 'function') labelRef(node);
        else if (labelRef) labelRef.current = node;
    }

    return (
        <motion.label
            role='searchbox'
            id={uniqueId}
            ref={refCallback}
            className={box()}
        >
            <AutocompleteInput
                {...rest}
                className={input()}
                placeholder={label}
            />
        </motion.label>
    );
};

export default SearchBox;
