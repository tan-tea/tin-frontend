'use client'

import type {
    FC,
    ReactNode,
    MouseEventHandler,
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
    selected?: boolean;
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
        selected,
        description,
        value,
        onSelectOption,
    } = props;

    const handleClick: MouseEventHandler = () => {
        if (!onSelectOption) return;

        onSelectOption(value);
    };

    return (
        <Card className='flex-1 p-0 w-full md:w-56 shadow-none border border-gray-100 bg-light-400'>
            <CardActionsArea
                onClick={handleClick}
                className={selected ? 'bg-primary-light' : ''}
            >
                <CardHeader
                    avatar={icon}
                    title={title}
                />
                <CardMedia
                    component='img'
                    className='hidden w-full h-36 object-fill bg-gray-200 md:block'
                    image={image}
                />
                <CardContent>
                    <Text
                        variant='h2'
                        component='h3'
                        className='hidden text-lg md:block'
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
