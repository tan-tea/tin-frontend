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
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from 'lib/utils';

import Input from 'ui/field/input';

const autocomplete = tv({
    slots: {
        input: cn('w-full'),
        trigger: cn('outline-none'),
        clear: cn('h-6 w-6 flex items-center justify-center'),
        positioner: cn('outline-none'),
        popup: cn(
            'box-border mt-2 p-3 overflow-y-auto scroll-py-2 shadow-xs bg-white',
            'rounded-2xl w-[var(--anchor-width)] max-w-[var(--available-height)] max-h-[min(var(--available-height),_23rem)]',
            'dark:bg-dark-600 dark:text-light-400'
        ),
        backdrop: cn(
            'fixed inset-0 bg-black/10 h-screen w-full z-40',
            'dark:bg-dark-300/50'
        ),
        empty: cn('text-center text-sm text-gray-600/75 py-2 font-nunito'),
        item: '',
        group: cn(''),
        groupLabel: cn('text-base leading-4 pt-2.5 pb-1.5 font-semibold'),
    },
    variants: {},
    defaultVariants: {},
});

type AutocompleteVariants = VariantProps<typeof autocomplete>;

type AutocompleteProps = ComponentProps<typeof BaseAutocomplete.Root>
& AutocompleteVariants;

export const Autocomplete: FC<AutocompleteProps> = ({ ...props }) => {
    'use memo'
    return (
        <BaseAutocomplete.Root
            {...props}
            data-slot='autocomplete-root'
        />
    );
};

type AutocompleteInputProps = ComponentProps<typeof BaseAutocomplete.Input>
& AutocompleteVariants;

export const AutocompleteInput: FC<AutocompleteInputProps> = ({ ...props }) => {
    'use memo'
    const { input } = autocomplete();

    return <BaseAutocomplete.Input
        render={<Input/>}
        {...props}
        data-slot='autocomplete-input'
        className={input({
            className: props.className as ClassValue,
        })}
    />
};

type AutocompleteTriggerProps = ComponentProps<typeof BaseAutocomplete.Trigger>
& AutocompleteVariants;

export const AutocompleteTrigger: FC<AutocompleteTriggerProps> = ({ ...props }) => {
    'use memo'
    const { trigger } = autocomplete();

    return (
        <BaseAutocomplete.Trigger
            {...props}
            data-slot='autocomplete-trigger'
            className={trigger({
                className: props.className as ClassValue,
            })}
        />
    );
}

type AutocompleteClearProps = ComponentProps<typeof BaseAutocomplete.Clear>
& AutocompleteVariants;

export const AutocompleteClear: FC<AutocompleteClearProps> = ({ ...props }) => {
    'use memo'
    const { clear } = autocomplete();

    return (
        <BaseAutocomplete.Clear
            {...props}
            data-slot='autocomplete-clear'
            className={clear({
                className: props.className as ClassValue,
            })}
        />
    );
}

type AutocompletePortalProps = ComponentProps<typeof BaseAutocomplete.Portal>
& AutocompleteVariants;

export const AutocompletePortal: FC<AutocompletePortalProps> = ({ ...props }) => {
    'use memo'
    return (
        <BaseAutocomplete.Portal
            {...props}
            data-slot='autocomplete-portal'
        />
    );
}

type AutocompleteBackdropProps = ComponentProps<typeof BaseAutocomplete.Backdrop>
& AutocompleteVariants;

export const AutocompleteBackdrop: FC<AutocompleteBackdropProps> = ({ ...props }) => {
    'use memo'
    const { backdrop } = autocomplete();

    return (
        <BaseAutocomplete.Backdrop
            {...props}
            data-slot='autocomplete-backdrop'
            className={backdrop({
                className: props.className as ClassValue,
            })}
        />
    );
}

type AutocompletePositionerProps = ComponentProps<typeof BaseAutocomplete.Positioner>
& ComponentProps<typeof motion.div>
& AutocompleteVariants;

export const AutocompletePositioner: FC<AutocompletePositionerProps> = ({ ...props }) => {
    'use memo'
    const { positioner } = autocomplete();

    return (
        <BaseAutocomplete.Positioner
            {...props}
            data-slot='autocomplete-positioner'
            className={positioner({
                className: props.className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
}

type AutocompletePopupProps = ComponentProps<typeof BaseAutocomplete.Popup>
& ComponentProps<typeof motion.div>
& AutocompleteVariants;

export const AutocompletePopup: FC<AutocompletePopupProps> = ({ ...props }) => {
    'use memo'
    const { popup } = autocomplete();

    return (
        <BaseAutocomplete.Popup
            {...props}
            data-slot='autocomplete-popup'
            className={popup({
                className: props.className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
}

type AutocompleteEmptyProps = ComponentProps<typeof BaseAutocomplete.Empty>
& ComponentProps<typeof motion.div>
& AutocompleteVariants;

export const AutocompleteEmpty: FC<AutocompleteEmptyProps> = ({ ...props }) => {
    'use memo'
    const { empty } = autocomplete();

    return (
        <BaseAutocomplete.Empty
            {...props}
            data-slot='autocomplete-empty'
            className={empty({
                className: props.className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
}

type AutocompleteListProps = ComponentProps<typeof BaseAutocomplete.List>
& AutocompleteVariants;

export const AutocompleteList: FC<AutocompleteListProps> = ({ ...props }) => {
    'use memo'
    return (
        <BaseAutocomplete.List
            {...props}
            data-slot='autocomplete-list'
        />
    );
}

type AutocompleteItemProps = ComponentProps<typeof BaseAutocomplete.Item>
& ComponentProps<typeof motion.div>
& AutocompleteVariants;

export const AutocompleteItem: FC<AutocompleteItemProps> = ({ ...props }) => {
    'use memo'
    const { item } = autocomplete();

    return (
        <BaseAutocomplete.Item
            {...props}
            data-slot='autocomplete-item'
            className={item({
                className: props.className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
}

type AutocompleteGroupProps = ComponentProps<typeof BaseAutocomplete.Group>
& AutocompleteVariants;

export const AutocompleteGroup: FC<AutocompleteGroupProps> = ({ ...props }) => {
    'use memo'
    const { group } = autocomplete();

    return (
        <BaseAutocomplete.Group
            {...props}
            data-slot='autocomplete-group'
            className={group({
                className: props.className as ClassValue,
            })}
        />
    );
}

type AutocompleteGroupLabel = ComponentProps<typeof BaseAutocomplete.GroupLabel>
& AutocompleteVariants;

export const AutocompleteGroupLabel: FC<AutocompleteGroupLabel> = ({ ...props }) => {
    'use memo'
    const { groupLabel } = autocomplete();

    return (
        <BaseAutocomplete.GroupLabel
            {...props}
            data-slot='autocomplete-group-label'
            className={groupLabel({
                className: props.className as ClassValue,
            })}
        />
    );
}
