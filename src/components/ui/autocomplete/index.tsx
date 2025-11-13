'use client'

import type {
    FC,
    ComponentProps,
} from 'react';
import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';
import { motion } from 'motion/react';
import { Autocomplete as BaseAutocomplete } from '@base-ui-components/react/autocomplete'

import Input from 'ui/field/input';

const autocomplete = tv({
    slots: {
        root: '',
        positioner: 'outline-none',
        popup: 'box-border mt-2 p-2 overflow-y-auto scroll-py-2 shadow-xs rounded-md w-[var(--anchor-width)] max-w-[var(--available-height)] max-h-[min(var(--available-height),_23rem)]',
        empty: '',
        item: '',
        input: '',
    },
    variants: {},
    defaultVariants: {},
});

type AutocompleteVariants = VariantProps<typeof autocomplete>;

export const AutocompleteRoot: FC<ComponentProps<typeof BaseAutocomplete.Root> & AutocompleteVariants> = ({ ...props }) => {
    return <BaseAutocomplete.Root
        {...props}
        data-slot='autocomplete-root'
    />
};

export const AutocompleteInput: FC<ComponentProps<typeof BaseAutocomplete.Input> & AutocompleteVariants> = ({ ...props }) => {
    'use memo'
    const {
        input,
    } = autocomplete();

    return <BaseAutocomplete.Input
        {...props}
        data-slot='autocomplete-input'
        className={input({
            className: props.className as ClassValue,
        })}
        render={<Input/>}
    />
};

export const AutocompletePortal: FC<ComponentProps<typeof BaseAutocomplete.Portal> & AutocompleteVariants> = ({ ...props }) => {
    return <BaseAutocomplete.Portal
        {...props}
        data-slot='autocomplete-portal'
    />
}

export const AutocompletePositioner: FC<ComponentProps<typeof BaseAutocomplete.Positioner> & AutocompleteVariants> = ({ ...props }) => {
    'use memo'
    const {
        positioner,
    } = autocomplete();

    return <BaseAutocomplete.Positioner
        {...props}
        data-slot='autocomplete-positioner'
        className={positioner({
            className: props.className as ClassValue,
        })}
        render={<motion.div/>}
    />
}

export const AutocompletePopup: FC<ComponentProps<typeof BaseAutocomplete.Popup> & AutocompleteVariants> = ({ ...props }) => {
    'use memo'
    const {
        popup,
    } = autocomplete();

    return <BaseAutocomplete.Popup
        {...props}
        data-slot='autocomplete-popup'
        className={popup({
            className: props.className as ClassValue,
        })}
        render={<motion.div/>}
    />
}

export const AutocompleteEmpty: FC<ComponentProps<typeof BaseAutocomplete.Empty> & AutocompleteVariants> = ({ ...props }) => {
    'use memo'
    const {
        empty,
    } = autocomplete();

    return <BaseAutocomplete.Empty
        {...props}
        data-slot='autocomplete-empty'
        className={empty({
            className: props.className as ClassValue,
        })}
        render={<motion.div/>}
    />
}

export const AutocompleteList: FC<ComponentProps<typeof BaseAutocomplete.List> & AutocompleteVariants> = ({ ...props }) => {
    return <BaseAutocomplete.List
        {...props}
        data-slot='autocomplete-list'
    />
}

export const AutocompleteItem: FC<ComponentProps<typeof BaseAutocomplete.Item> & AutocompleteVariants> = ({ ...props }) => {
    'use memo'
    const {
        item,
    } = autocomplete();

    return <BaseAutocomplete.Item
        {...props}
        data-slot='autocomplete-item'
        className={item({
            className: props.className as ClassValue,
        })}
        render={<motion.div/>}
    />
}
