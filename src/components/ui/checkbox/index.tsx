'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import { motion } from 'motion/react';
import { tv } from 'tailwind-variants';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';

import { Check } from 'components/icons';

const checkbox = tv({
    slots: {
        group: ['flex flex-col items-start gap-y-2'],
        root: [
            'box-border flex w-6 h-6 items-center justify-center rounded-sm outline-none border-none',
            'data-[unchecked]:bg-neutral-400 data-[checked]:bg-[var(--mui-palette-primary-main)]'
        ],
        indicator: [
            'flex items-center justify-center text-gray-50',
            'data-[unchecked]:hidden',
        ],
    },
    variants: {},
});

type CheckboxVariants = VariantProps<typeof checkbox>;

type CheckboxGroupProps = CheckboxVariants
    & ComponentProps<typeof BaseCheckboxGroup>
    & ComponentProps<typeof motion.div>;

const CheckboxGroup: FC<CheckboxGroupProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { group } = checkbox();

    return (
        <BaseCheckboxGroup
            {...props}
            data-slot='checkbox-group'
            className={group({
                className: className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
}

CheckboxGroup.displayName = 'Checkbox';

type CheckboxProps = CheckboxVariants & ComponentProps<typeof BaseCheckbox.Root>;

const Checkbox: FC<CheckboxProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { root } = checkbox();

    return (
        <BaseCheckbox.Root
            {...props}
            data-slot='checkbox-root'
            className={root({
                className: className as ClassValue,
            })}
        />
    );
}

Checkbox.displayName = 'Checkbox';

type CheckboxIndicatorProps = CheckboxVariants & ComponentProps<typeof BaseCheckbox.Indicator>;

const CheckboxIndicator: FC<CheckboxIndicatorProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { indicator } = checkbox();

    return (
        <BaseCheckbox.Indicator
            {...props}
            data-slot='checkbox-indicator'
            className={indicator({
                className: className as ClassValue,
            })}
        >
            {props.children ?? <Check/>}
        </BaseCheckbox.Indicator>
    );
}

CheckboxIndicator.displayName = 'CheckboxIndicator';

export {
    CheckboxGroup,
    Checkbox,
    CheckboxIndicator,
};
