'use client'

import type {
    FC,
} from 'react';
import {
    motion,
    type MotionProps,
} from 'motion/react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { Menu } from '@base-ui-components/react/menu';

import {
    BaseIcon,
    ChevronDown,
    ChevronUp,
} from 'icons/index';

export const dropdown = tv({
    slots: {
        trigger: 'box-border flex items-center justify-center gap-x-1 text-xs font-medium select-none text-gray-600 py-1.5 px-3 dark:text-light-600',
        positioner: 'outline-none z-50',
        popup: 'box-border p-0.5 rounded-md bg-[canvas] shadow-md',
        item: 'pl-4 pr-8 py-2 flex text-xs text-black leading-5',
    },
    variants: {
        variant: {
            bordered: {
                trigger: 'border border-gray-200 rounded-lg',
            },
            borderless: {
                trigger: 'border-none px-0 py-0',
            },
        },
        disabled: {
            true: {
                item: 'opacity-80'
            },
        },
        selected: {
            true: {
                item: 'text-primary',
            },
        },
        fullWidth: {
            true: {
                trigger: 'w-full',
            },
        },
    },
});

export type DropdownVariants = VariantProps<typeof dropdown>;

export type DropdownOption = {
    label: string;
    value: string;
}

export type DropdownProps = DropdownVariants & MotionProps & {
    option: DropdownOption;
    options: DropdownOption[];
    onSelectOption?: (option: DropdownOption) => void;
    open?: boolean;
    onOpenChange: Menu.Root.Props['onOpenChange'];
    disabled?: boolean;
    backdrop?: boolean;
    keepMounted?: boolean;
    openOnHover?: boolean;
};

const Dropdown: FC<DropdownProps> = (
    props: DropdownProps,
) => {
    const {
        option,
        options,
        onSelectOption,
        open = false,
        onOpenChange,
        fullWidth,
        variant = 'borderless',
        disabled = false,
        backdrop = false,
        keepMounted = true,
        openOnHover = false,
    } = props;

    const {
        trigger,
        positioner,
        popup,
        item,
    } = dropdown({ variant, fullWidth, });

    const isSelectedOption: (source: DropdownOption) => boolean = (source) =>
        source?.value === option?.value;

    return (
        <Menu.Root
            open={open}
            disabled={disabled}
            openOnHover={openOnHover}
            onOpenChange={onOpenChange}
        >
            <Menu.Trigger
                disabled={disabled}
                className={trigger()}
                render={<motion.button/>}
            >
                {option.label} {<BaseIcon Icon={open ? ChevronUp : ChevronDown}/>}
            </Menu.Trigger>
            <Menu.Portal keepMounted={keepMounted}>
                {backdrop && <Menu.Backdrop/>}
                <Menu.Positioner
                    className={positioner()}
                    sideOffset={8}
                >
                    <Menu.Popup className={popup()}>
                        {/* TODO: CREATE MAPPER FOR COMMON USAGES IN MENU OPTIONS */}
                        {options && options?.length > 0 && options?.map?.((o, index) => (
                            <Menu.Item
                                key={index}
                                disabled={isSelectedOption(o)}
                                className={item({
                                    selected: isSelectedOption(o),
                                    disabled: isSelectedOption(o)
                                })}
                                onClick={() => onSelectOption && onSelectOption(o)}
                            >
                                {o?.label}
                            </Menu.Item>
                        ))}
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    );
}

export default Dropdown;
