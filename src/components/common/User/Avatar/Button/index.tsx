'use client'

import type {
    FC,
    MouseEventHandler,
} from 'react';
import { useTranslations, } from 'next-intl';

import { getDiscordAvatar, } from 'lib/utils';

import {
    Avatar,
    Button,
} from 'ui/index';
import { ChevronDown, } from 'icons/index';

import UserAvatarContent from 'common/User/Avatar/Content';

type UserAvatarButtonProps = {
    user?: any;
    handleMouseEnter?: MouseEventHandler;
    handleMouseLeave?: MouseEventHandler;
};

const UserAvatarButton: FC<UserAvatarButtonProps> = (
    props: UserAvatarButtonProps
) => {
    const {
        user,
        handleMouseEnter,
        handleMouseLeave,
    } = props;

    const t = useTranslations();

    return (
        <Button
            color='primary'
            variant='text'
            rounded='full'
            className='flex items-center gap-x-1.5'
            endIcon={<ChevronDown
                className='size-6 text-gray-800 dark:text-gray-200'
                strokeWidth={1}
                absoluteStrokeWidth
            />}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Avatar
                className='mr-1.5'
                alt={user?.username}
                src={getDiscordAvatar(user)}
            />
            <UserAvatarContent
                label={t('header.greet')}
                name={user?.global_name!}
            />
        </Button>
    );
}

export default UserAvatarButton;
