'use client'

import type { FC, ReactNode } from 'react';

import { Fragment } from 'react';
import { useFormatter, useTranslations } from 'next-intl';

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
    const t = useTranslations();
    const formatter = useFormatter();

    const priceIsDefined = (Boolean(option.priceDelta) && option.priceDelta > 0);

    return (
        <Field className='flex flex-row items-center justify-between'>
            <div className='flex flex-col gap-y-2'>
                <FieldLabel>{option.name}</FieldLabel>
                <FieldDescription>
                    {priceIsDefined && (
                        <Fragment>
                            +{formatter.number(option.priceDelta, {
                                currency: 'COP',
                                currencySign: 'standard',
                            })}
                        </Fragment>
                    )}
                    {!priceIsDefined && t('included')}
                </FieldDescription>
            </div>
            {children}
        </Field>
    );
}

export default OptionLabel;
