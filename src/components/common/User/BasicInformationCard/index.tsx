'use client'

import { FC, } from 'react';

import { getDiscordBanner, } from 'lib/utils';

import {
    Card,
    Text,
    CardMedia,
    CardContent,
} from 'ui/index';

type UserBasicInformationCardProps = {
    user?: any;
};

const UserBasicInformationCard: FC<UserBasicInformationCardProps> = (
    props: UserBasicInformationCardProps
) => {
    const {
        user,
    } = props;

    return (
        <Card className='p-0 w-xs shadow-none border border-gray-100 bg-white'>
            <CardMedia
                style={{
                    backgroundColor: user?.banner_color || 'transparent',
                }}
                component='img'
                className='w-full h-32 object-fill'
                image={getDiscordBanner(user)}
            />
            <CardContent>
                <Text>{user?.global_name}</Text>
                <Text>{user?.username}</Text>
            </CardContent>
        </Card>
    );
}

export default UserBasicInformationCard;
