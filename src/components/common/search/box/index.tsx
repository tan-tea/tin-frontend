'use client'
import type { FC, Ref, RefCallback, ComponentProps } from 'react';

import { useId } from 'react';
import { motion } from 'motion/react';
import { tv, cn } from 'tailwind-variants';

import { AutocompleteClear, AutocompleteInput } from 'ui/autocomplete';
import {
    Search,
    Icon,
} from 'components/icons';

const searchBox = tv({
    slots: {
        box: cn(
            'w-full flex items-center gap-x-2 flex-1 bg-white border px-4 py-2 rounded-2xl',
            'border-[var(--mui-palette-grey-600)]/50 bg-[var(--mui-palette-grey-600)]/5',
            'dark:bg-dark-400 dark:border-dark-300'
        ),
        input: 'text-base font-nunito dark:text-light-400',
        icon: cn('text-[var(--mui-palette-grey-600)]/50'),
    },
});

type SearchBoxProps = ComponentProps<typeof AutocompleteInput> & {
    label: string;
    labelRef?: Ref<HTMLLabelElement>;
};

const SearchBox: FC<SearchBoxProps> = ({
    label,
    labelRef,
    className,
    ...props
}) => {
    'use memo'
    const {
        box,
        input,
        icon,
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
            <Icon
                value={Search}
                className={icon()}
            />
            <AutocompleteInput
                {...props}
                className={input()}
                placeholder={label}
            />
            <AutocompleteClear/>
        </motion.label>
    );
};

export default SearchBox;
