'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import {
    useMemo,
    Fragment,
    useState,
} from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
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
import { ChevronUp, ChevronDown } from 'components/icons';

import type { OptionGroups } from 'pages/item-by-slug/schemas';

const OptionLabel = dynamic(
    () => import('./option-label'),
    {
        ssr: false,
    },
);

type Props = Readonly<{
    control: Control<OptionGroups>
}>;

const OfferDetailOptionGroups: FC<Props> = ({
    control,
}) => {
    'use memo'
    const t = useTranslations();

    const currentOffer = useAtomValue(offerAtom);

    const optionGroups = useMemo(
        () => (currentOffer?.optionGroups ?? [])
            .sort((a, b) => a.sortOrder - b.sortOrder),
        [currentOffer]
    );

    const [openedGroups, setOpenedGroups] = useState<Array<string>>(optionGroups.map(o => o.group.id));

    const { errors } = useFormState({
        control,
    });

    return (
        <Accordion
            multiple
            value={openedGroups} // open all accordions available per offer
            onValueChange={(value) => setOpenedGroups(value)}
            className='flex flex-col gap-y-4'
        >
            {optionGroups.map(optionGroup => {
                const { group } = optionGroup;

                const groupId = group.id;
                const isRequired = group.required;
                const isSingleSelection = group.max === 1;
                const isSingleOption = group.options.length === 1;
                const isGroupOpen = openedGroups.includes(groupId);

                return (
                    <AccordionItem key={groupId} value={groupId}>
                        <AccordionHeader className='p-4'>
                            {group.name}
                            <AccordionTrigger className='p-0'>
                                <div className='flex flex-col items-start justify-center'>
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
                                {isGroupOpen && <ChevronUp/>}
                                {!isGroupOpen && <ChevronDown/>}
                            </AccordionTrigger>
                        </AccordionHeader>
                        {!isSingleOption && (
                            <AccordionPanel>
                                <Controller
                                    name={`options.${groupId}`}
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field, }) => {
                                        const getControls = () => {
                                            return isSingleSelection ? {
                                                value: field?.value?.[0],
                                                onChange: (v: unknown) => field.onChange([v]),
                                                Wrapper: RadioGroup,
                                                Control: Radio,
                                                Indicator: RadioIndicator,
                                            } : {
                                                value: field.value,
                                                onChange: (v: unknown) => field.onChange(v),
                                                Wrapper: CheckboxGroup,
                                                Control: Checkbox,
                                                Indicator: CheckboxIndicator,
                                            };
                                        }

                                        const {
                                            value,
                                            onChange,
                                            Wrapper,
                                            Control,
                                            Indicator,
                                        } = getControls();

                                        return (
                                            <Fragment>
                                                <Wrapper
                                                    value={value as any}
                                                    onValueChange={onChange}
                                                    aria-required={isRequired}
                                                    className='gap-y-4'
                                                >
                                                    {group.options.map(option => (
                                                        <OptionLabel key={option.id} option={option}>
                                                            <Control value={option.id}>
                                                                <Indicator/>
                                                            </Control>
                                                        </OptionLabel>
                                                    ))}
                                                </Wrapper>
                                            </Fragment>
                                        )
                                    }}
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
