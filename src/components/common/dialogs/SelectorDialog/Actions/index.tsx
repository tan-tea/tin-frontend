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

    const timeoutRef = useRef<number | string | null>(null);

    const handleClick: MouseEventHandler = async () => {
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
