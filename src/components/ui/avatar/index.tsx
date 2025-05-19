'use client'

import {
    FC,
    memo,
    useRef,
} from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootAvatar,
    AvatarProps as RootAvatarProps,
} from '@mui/material/Avatar';

const avatar = tv({
    base: '',
});

type AvatarVariants = VariantProps<typeof avatar>;

type AvatarProps = object & RootAvatarProps;

const Avatar: FC<AvatarProps> = (props: AvatarProps) => {
    const {
        src,
        variant,
        children,
        className,
        ...rest
    } = props;

    const innerAvatarRef = useRef(null);

    return (
        <RootAvatar
            {...rest}
            src={src}
            variant={variant}
            children={children}
            className={avatar({
                className,
            })}
        >
            {/* <Image
                {...rest}
                fill
                width={0}
                height={0}
                src={src!}
                alt={rest.alt!}
                className={''}
            /> */}
        </RootAvatar>
    );
};

export default memo(Avatar);
