'use client'

import {
    useRef,
    useEffect,
    type FC,
    type ReactNode,
    type MouseEventHandler,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Button,
} from 'ui/index';

type SelectorDialogActionsProps = {
    t: ReturnType<typeof useTranslations>;
    renderAction?: (props: SelectorDialogActionsProps) => ReactNode;
    onSave?: () => void;
    onCancel: () => void;
};

const SelectorDialogActions: FC<SelectorDialogActionsProps> = (
    props: SelectorDialogActionsProps,
) => {
    'use memo'
    const {
        t,
        renderAction,
        onCancel,
    } = props;

    const handleClick: MouseEventHandler = () => {
        if (onCancel) onCancel?.();
    };

    return (
        <Box className='w-full flex flex-col gap-y-4 md:w-auto md:flex-row md:gap-x-4'>
            {renderAction && renderAction(props)}
            <Button
                block
                mobile
                rounded='full'
                size='large'
                color='primary'
                variant='outlined'
                onClick={handleClick}
            >
                {t('shared.close')}
            </Button>
        </Box>
    );
};

export default SelectorDialogActions;
