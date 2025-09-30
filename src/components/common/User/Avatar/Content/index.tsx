'use client'

import type { FC, } from 'react';

import {
    Box,
    Text,
} from 'ui/index';

type UserAvatarContentProps = {
    label: string;
    name: string;
};

const UserAvatarContent: FC<UserAvatarContentProps> = (
    props: UserAvatarContentProps
) => {
    const {
        label,
        name,
    } = props;

    return (
        <Box className='flex flex-col gap-y-0 justify-start items-start'>
            <Text
                variant='body1'
                component='p'
                className='leading-2 font-secondary text-sm font-base  dark:text-gray-200'
            >
                {label}
            </Text>
            <Text
                variant='body1'
                component='p'
                className='leading-3 text-base font-semibold'
            >
                {name}
            </Text>
        </Box>
    );
};

export default UserAvatarContent;
