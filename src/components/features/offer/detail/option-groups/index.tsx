'use client'

import type { FC } from 'react';

import {
    useMemo,
    Fragment,
} from 'react';
import { useAtomValue } from 'jotai';
import { useFormatter, useTranslations } from 'next-intl';
import { Control, Controller, useFormState } from 'react-hook-form';

import { offerAtom } from 'shared/state';

import { Paragraph } from 'ui/text';
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    AccordionTrigger
} from 'ui/accordion';
import {
    Radio,
    RadioGroup,
    RadioIndicator
} from 'ui/radio';
import {
    Checkbox,
    CheckboxGroup,
    CheckboxIndicator,
} from 'ui/checkbox';

import type { OptionGroups } from 'pages/item-by-slug';

type Props = Readonly<{
    control: Control<OptionGroups>
}>;

const OfferDetailOptionGroups: FC<Props> = ({
    control,
}) => {
    'use memo'
    const t = useTranslations();
    const formatter = useFormatter();

    const currentOffer = useAtomValue(offerAtom);

    const optionGroups = useMemo(
        () => (currentOffer?.optionGroups ?? [])
            .sort((a, b) => a.sortOrder - b.sortOrder),
        [currentOffer]
    );

    const { errors } = useFormState({
        control,
    });

    return (
        <Accordion
            multiple
            defaultValue={optionGroups.map(o => o.group.id)} // open all accordions available per offer
            className='flex flex-col gap-y-4'
        >
            {optionGroups.map(optionGroup => {
                const { group } = optionGroup;

                const groupId = group.id;
                const isRequired = group.required;
                const isSingleSelection = group.max === 1;
                const isSingleOption = group.options.length === 1;

                return (
                    <AccordionItem key={groupId} value={groupId}>
                        <AccordionHeader>
                            <AccordionTrigger>
                                <div className='flex flex-col items-start justify-center'>
                                    {group.name}
                                    <Paragraph>
                                        {!errors.options?.[groupId]
                                            ? t('test', {
                                                min: isRequired ? group.min : 0,
                                                max: group.max ?? 0,
                                            })
                                            : errors.options[groupId]?.message
                                        }
                                    </Paragraph>
                                </div>
                            </AccordionTrigger>
                        </AccordionHeader>
                        {!isSingleOption && (
                            <AccordionPanel>
                                <Controller
                                    name={`options.${groupId}`}
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field, }) => (
                                        <Fragment>
                                            {isSingleSelection && (
                                                <RadioGroup
                                                    value={field.value?.[0]}
                                                    onValueChange={(value) => field.onChange([value])}
                                                    required={isRequired}
                                                    aria-required={isRequired}
                                                >
                                                    {group.options.map(option => {
                                                        return (
                                                            <label key={option.id} className='w-full flex items-center justify-between gap-x-2'>
                                                                <div className='flex flex-col gap-y-1'>
                                                                    <span>
                                                                        {option.name}
                                                                    </span>
                                                                    {option.priceDelta > 0 && (
                                                                        <span>
                                                                            {formatter.number(option.priceDelta, {
                                                                                currency: 'COP',
                                                                            })}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <Radio value={option.id}>
                                                                    <RadioIndicator/>
                                                                </Radio>
                                                            </label>
                                                        );
                                                    })}
                                                </RadioGroup>
                                            )}
                                            {!isSingleSelection && (
                                                <CheckboxGroup
                                                    value={field.value}
                                                    onValueChange={(value) => field.onChange(value)}
                                                    aria-required={isRequired}
                                                >
                                                    {group.options.map(option => {
                                                        return (
                                                            <label key={option.id} className='w-full flex items-center justify-between gap-x-2'>
                                                                <div className='flex flex-col gap-y-1'>
                                                                    <span>
                                                                        {option.name}
                                                                    </span>
                                                                    {option.priceDelta > 0 && (
                                                                        <span>
                                                                            +{formatter.number(option.priceDelta, {
                                                                                currency: 'COP',
                                                                            })}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <Checkbox value={option.id}>
                                                                    <CheckboxIndicator/>
                                                                </Checkbox>
                                                            </label>
                                                        );
                                                    })}
                                                </CheckboxGroup>
                                            )}
                                        </Fragment>
                                    )}
                                />
                            </AccordionPanel>
                        )}
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

export default OfferDetailOptionGroups;
