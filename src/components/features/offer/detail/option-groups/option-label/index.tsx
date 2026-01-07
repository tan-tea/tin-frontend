'use client'

import type { FC, ReactNode } from 'react';

import { useFormatter } from 'next-intl';

import type {
    Option
} from 'shared/models';

import {
    Field,
    FieldDescription,
    FieldLabel,
} from 'ui/field';

type Props = Readonly<{
    option: Option;
    children: ReactNode;
}>;

const OptionLabel: FC<Props> = ({
    option,
    children,
}) => {
    'use memo'
    const formatter = useFormatter();

    return (
        <Field className='flex flex-row items-center justify-between'>
            <div className='flex flex-col gap-y-2'>
                <FieldLabel>{option.name}</FieldLabel>
                <FieldDescription>
                    +{formatter.number(option.priceDelta, {
                        currency: 'COP',
                        currencySign: 'standard',
                    })}
                </FieldDescription>
            </div>
            {children}
        </Field>
    );
}

export default OptionLabel;
