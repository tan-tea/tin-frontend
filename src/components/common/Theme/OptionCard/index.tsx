'use client'

import {
    FC,
    ReactNode,
} from 'react';

import { ApplicationTheme, } from 'shared/stores/application-store/types';

import {
    Text,
    Card,
    CardMedia,
    CardHeader,
    CardContent,
    CardActionsArea,
} from 'ui/index';

type ThemeOptionCardProps = {
    icon: ReactNode;
    title: string;
    image: string;
    label: string;
    isActive?: boolean;
    description: string;
    value: ApplicationTheme;
    onSelectOption: (value: ApplicationTheme) => void;
};

export type ThemeOption = ThemeOptionCardProps;

const ThemeOptionCard: FC<ThemeOptionCardProps> = (
    props: ThemeOptionCardProps,
) => {
    const {
        icon,
        title,
        image,
        label,
        isActive,
        description,
        value,
        onSelectOption,
    } = props;

    return (
        <Card className='flex-1 p-0 w-56 shadow-none border border-gray-100 bg-light-400'>
            <CardActionsArea
                onClick={() => onSelectOption && onSelectOption(value)}
                sx={{
                    ...(isActive && {
                        backgroundColor: 'var(--color-primary)',
                    }),
                }}
            >
                <CardHeader
                    avatar={icon}
                    title={title}
                />
                <CardMedia
                    component='img'
                    className='w-full h-36 object-fill bg-gray-200'
                    image={image}
                />
                <CardContent>
                    <Text
                        variant='h2'
                        component='h3'
                        className='text-lg'
                    >
                        {label}
                    </Text>
                    <Text
                        variant='body2'
                        component='p'
                        className='text-gray-800 text-sm'
                    >
                        {description}
                    </Text>
                </CardContent>
            </CardActionsArea>
        </Card>
    );
};

export default ThemeOptionCard;
