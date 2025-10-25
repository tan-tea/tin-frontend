'use client'

import type {
    FC,
    MouseEvent,
    MouseEventHandler,
} from 'react';
import { tv, } from 'tailwind-variants';
import { useTranslations, } from 'next-intl';

import {
    Button,
    IconButton,
} from 'ui/index';
import { BaseIcon, MoveLeft, } from 'icons/index';

import { useNavigation, } from 'shared/hooks';

const backButton = tv({
    base: 'top-0 left-0 text-gray-800 dark:text-gray-200',
});

type BackButtonProps = {
    showLabel?: boolean;
    className?: string;
};

const BackButton: FC<BackButtonProps> = (props: BackButtonProps) => {
    const {
        className,
        // showLabel = true,
    } = props;

    const t = useTranslations();

    const {
        back,
    } = useNavigation();

    const handleGoBack: () => Promise<void> = async () =>
        await back();

    return (
        // <Button
        //     variant='text'
        //     rounded='full'
        //     className={backButton({
        //         className,
        //     })}
        //     startIcon={<BaseIcon Icon={MoveLeft}/>}
        //     onClick={handleClick}>
        //     {showLabel && t('shared.back')}
        // </Button>
        <IconButton
            size='md'
            borderless={true}
            onClick={() => handleGoBack()}
            className={backButton({
                className,
            })}
            Icon={MoveLeft}
        />
    );
};

export default BackButton;
