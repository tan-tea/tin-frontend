'use client'

import {
    FC,
    MouseEvent,
    MouseEventHandler,
} from 'react';
import { tv, } from 'tailwind-variants';
import { useTranslations, } from 'next-intl';

import {
    Button,
} from 'ui/index';
import { MoveLeft, } from 'icons/index';

import { useNavigation, } from 'shared/hooks';

const backButton = tv({
    base: 'absolute top-0 left-0 text-gray-800 dark:text-gray-200',
});

type BackButtonProps = {
    className?: string;
};

const BackButton: FC<BackButtonProps> = (props: BackButtonProps) => {
    const {
        className,
        ...rest
    } = props;

    const t = useTranslations();

    const {
        back,
    } = useNavigation();

    const handleClick: MouseEventHandler = async (event: MouseEvent) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();

        await back();
    };

    return (
        <Button
            variant='text'
            rounded='full'
            className={backButton({
                className,
            })}
            startIcon={<MoveLeft
                className='size-6'
                strokeWidth={1}
                absoluteStrokeWidth
            />}
            onClick={handleClick}>
            {t('shared.back')}
        </Button>
    );
};

export default BackButton;
