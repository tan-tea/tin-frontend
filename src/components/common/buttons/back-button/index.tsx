'use client';

import type { FC } from 'react';

import { useNavigation } from 'shared/hooks';

import { IconButton } from 'ui/button';
import { ArrowLeft } from 'components/icons';

type BackButtonProps = Readonly<object>;

const BackButton: FC<BackButtonProps> = () => {
    'use memo';
    const { back } = useNavigation();

    const handleClick = async () => await back();

    return (
        <IconButton
            variant='filled'
            color='background'
            onClick={handleClick}
        >
            <ArrowLeft/>
        </IconButton>
    );
};

export default BackButton;
