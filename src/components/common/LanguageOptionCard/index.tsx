'use client'

import type {
    FC,
    ReactNode,
    MouseEventHandler,
} from 'react';

import { ApplicationLanguage, } from 'shared/stores/application-store/types';

import {
    Card,
    CardActionsArea,
    CardHeader,
} from 'ui/index';

type LanguageOptionCardProps = {
    icon: ReactNode;
    title: string;
    selected: boolean;
    value: ApplicationLanguage;
    onSelectOption: (value: ApplicationLanguage) => void;
};

export type LanguageOption = LanguageOptionCardProps;

const LanguageOptionCard: FC<LanguageOptionCardProps> = (
    props: LanguageOptionCardProps,
) => {
    const {
        icon,
        title,
        selected,
        value,
        onSelectOption,
    } = props;

    const handleClick: MouseEventHandler = () => {
        if (onSelectOption) onSelectOption(value);
    }

    return (
        <Card className='flex-1 p-0 w-full shadow-none border border-gray-100 bg-[var(--mui-palette-grey-50)] dark:bg-dark-400 dark:border-none'>
            <CardActionsArea
                onClick={handleClick}
                className={selected ? 'bg-[var(--mui-palette-primary-main)]' : ''}
            >
                <CardHeader
                    avatar={icon}
                    title={title}
                />
            </CardActionsArea>
        </Card>
    );
}

export default LanguageOptionCard;
