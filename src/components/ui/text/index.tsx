'use client'

import {
    memo,
    type FC,
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
    base: 'text-base font-primary font-normal m-0 p-0 bg-transparent text-inherit',
    variants: {
        through: {
            true: 'line-through',
        },
    },
    defaultVariants: {
        through: false,
    },
});

type TextVariants = VariantProps<typeof text>;

type TextProps = TextVariants & RootTypographyProps;

const Text: FC<TextProps> = (props) => {
    const {
        through,
        children,
        className,
        ...rest
    } = props;

    return (
        <RootTypography
            className={text({
                through,
                className,
            })}
            children={children}
            {...rest}
        />
    )
};

export default memo(Text);
