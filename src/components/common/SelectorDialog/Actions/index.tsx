'use client'

import {
    useEffect,
    useRef,
    type FC,
    type MouseEvent,
    type MouseEventHandler,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Button,
} from 'ui/index';

type SelectorDialogActionsProps = {
    t: ReturnType<typeof useTranslations>;
    onSave?: () => void;
    onCancel: () => void;
};

const SelectorDialogActions: FC<SelectorDialogActionsProps> = (
    props: SelectorDialogActionsProps,
) => {
    const {
        t,
        onCancel,
    } = props;

    const timeoutRef = useRef<number | string | null>(null);

    const handleClick: MouseEventHandler = async (event: MouseEvent) => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

        const timeoutId = window.setTimeout(() => {
            if (onCancel)
                onCancel();
        }, 300);

        timeoutRef.current = timeoutId;
    };

    useEffect(() => {
        const cleanup = () => timeoutRef.current
            && window.clearTimeout(timeoutRef.current);

        return () => {
            cleanup();
        };
    }, []);

    return (
        <Box className='w-full flex flex-col-reverse gap-y-2 md:w-auto md:flex-row md:gap-x-4'>
            <Button
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
