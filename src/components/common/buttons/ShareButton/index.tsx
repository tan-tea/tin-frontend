'use client'

import type { FC, MouseEventHandler } from 'react'
import type { VariantProps } from 'tailwind-variants';

import { useShare } from 'shared/hooks';

import { IconButton } from 'ui/button';
import { Icon, Share } from 'components/icons';

type Item = {
    heading: string;
    description: string;
    source?: string;
};

type ShareButtonProps = {
    shareableItem: Item;
};

const ShareButton: FC<ShareButtonProps> = ({
    shareableItem,
}) => {
    'use memo'
    const {
        share,
        isSupported,
    } = useShare();

    const handleClick: MouseEventHandler = async () => {
        await share({
            title: shareableItem.heading,
            text: shareableItem.description,
            ...(shareableItem.source && {
                url: shareableItem.source,
            }),
        });
    }

    if (!isSupported) return null;

    return (
        <IconButton onClick={handleClick}>
            <Icon value={Share}/>
        </IconButton>
    );
}

export default ShareButton;
