'use client'

import {
    FC,
    memo,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootTypography,
    TypographyProps as RootTypographyProps,
} from '@mui/material/Typography';

const text = tv({
    base: 'text-base font-primary font-normal m-0 p-0 bg-transparent',
    variants: {},
    defaultVariants: {},
});

type TextVariants = VariantProps<typeof text>;

type TextProps = TextVariants & RootTypographyProps;

const Text: FC<TextProps> = (props) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootTypography
            className={text({
                className,
            })}
            children={children}
            {...rest}
        />
    )
};

export default memo(Text);
