'use client'
import type { FC, ReactNode } from 'react';
import type { Option } from 'shared/models';

import { useFormatter, useTranslations } from 'next-intl';

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
    const t = useTranslations();
    const formatter = useFormatter();

    const price = option?.priceDelta ?? 0
    const priceIsDefined = price > 0;

    return (
        <Field className='flex flex-row items-center justify-between'>
            <div className='flex flex-col gap-y-2'>
                <FieldLabel>{option.name}</FieldLabel>
                <FieldDescription>
                    {priceIsDefined && (
                        `+${formatter.number(price, {
                            currency: 'COP',
                            style: 'currency',
                            currencySign: 'standard',
                        })}`
                    )}
                    {!priceIsDefined && t('included')}
                </FieldDescription>
            </div>
            {children}
        </Field>
    );
}

export default OptionLabel;
