'use client'

import type {
    FC,
    MouseEventHandler
} from 'react'
import {
    tv,
    type VariantProps
} from 'tailwind-variants'

import { useShare } from 'shared/hooks';

import {
    Box,
    Tooltip,
    IconButton
} from 'ui/index';
import { Share } from 'icons/index';

const shareButton = tv({
    slots: {
        container: 'justify-self-center',
    },
});

type ShareButtonVariants = VariantProps<typeof shareButton>;

type Item = {
    heading: string;
    description: string;
    source?: string;
};

type ShareButtonProps = ShareButtonVariants & {
    shareableItem: Item;
};

const ShareButton: FC<ShareButtonProps> = (props) => {
    'use memo'
    const {
        shareableItem,
    } = props;

    const {
        container,
    } = shareButton();

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
        <Tooltip title={'share'}>
            <Box className={container()}>
                <IconButton
                    borderless
                    Icon={Share}
                    onClick={handleClick}
                />
            </Box>
        </Tooltip>
    );
}

export default ShareButton;
