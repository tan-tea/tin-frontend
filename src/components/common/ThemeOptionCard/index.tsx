'use client'

import type {
    FC,
    ReactNode,
    MouseEventHandler,
} from 'react';

import { ApplicationTheme, } from 'shared/stores/application-store/types';

import {
    Typography,
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
        if (onSelectOption) onSelectOption(value);
    };

    return (
        <Card
            shadow='none'
            className='flex-1 p-0 w-full md:w-56 border border-gray-100 bg-light-400 dark:bg-dark-400 dark:border-none'
        >
            <CardActionsArea
                onClick={handleClick}
                className={selected ? 'bg-[var(--mui-palette-primary-main)]' : ''}
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
                    <Typography
                        variant='h2'
                        component='h3'
                        className='hidden text-lg md:block dark:text-[var(--mui-palette-grey-50)]'
                    >
                        {label}
                    </Typography>
                    <Typography
                        variant='body2'
                        component='p'
                        className='text-gray-800 dark:text-[var(--mui-palette-grey-50)] text-sm'
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionsArea>
        </Card>
    );
};

export default ThemeOptionCard;
