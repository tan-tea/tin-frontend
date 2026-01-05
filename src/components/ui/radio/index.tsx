'use client'

import type { ComponentProps, FC } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import { motion } from 'motion/react';
import { tv, cn } from 'tailwind-variants';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';

const radio = tv({
    slots: {
        group: 'flex flex-col items-start gap-y-2',
        root: [
            'box-border flex w-6 h-6 items-center justify-center',
            'rounded-full outline-none border-none',
            'data-[checked]:bg-[var(--mui-palette-primary-main)] bg-neutral-400'
        ],
        indicator: [
            'flex items-center justify-center',
            'data-[unchecked]:hidden',
            "before:content-[''] before:rounded-full before:w-3 before:h-3 before:bg-gray-50"
        ],
    },
    variants: {},
});

type RadioVariants = VariantProps<typeof radio>;

type RadioGroupProps = RadioVariants
    & ComponentProps<typeof BaseRadioGroup>
    & ComponentProps<typeof motion.div>;

const RadioGroup: FC<RadioGroupProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { group } = radio();

    return (
        <BaseRadioGroup
            {...props}
            data-slot='radio-group'
            className={group({
                className: className as ClassValue,
            })}
            render={<motion.div/>}
        />
    );
}

RadioGroup.displayName = 'RadioGroup';

type RadioProps = RadioVariants & ComponentProps<typeof BaseRadio.Root>;

const Radio: FC<RadioProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { root } = radio();

    return (
        <BaseRadio.Root
            {...props}
            data-slot='radio-root'
            className={root({
                className: className as ClassValue,
            })}
        />
    );
}

Radio.displayName = 'Radio';

type RadioIndicatorProps = RadioVariants & ComponentProps<typeof BaseRadio.Indicator>;

const RadioIndicator: FC<RadioIndicatorProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { indicator } = radio();

    return (
        <BaseRadio.Indicator
            {...props}
            data-slot='radio-indicator'
            className={indicator({
                className: className as ClassValue,
            })}
        />
    );
}

RadioIndicator.displayName = 'RadioIndicator';

export {
    RadioGroup,
    Radio,
    RadioIndicator,
};
