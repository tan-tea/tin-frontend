'use client'

import type {
    FC,
    ReactNode,
    MouseEventHandler,
} from 'react';

import { useTranslations, } from 'next-intl';

import { ButtonRoot } from 'ui/button';

type SelectorDialogActionsProps = {
    t: ReturnType<typeof useTranslations>;
    renderAction?: (props: SelectorDialogActionsProps) => ReactNode;
    onSave?: () => void;
    onCancel: () => void;
};

const SelectorDialogActions: FC<SelectorDialogActionsProps> = (props) => {
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
        <div className='w-full flex flex-col gap-y-4 md:w-auto md:flex-row md:gap-x-4'>
            {renderAction && renderAction(props)}
            <ButtonRoot onClick={handleClick}>
                {t('shared.close')}
            </ButtonRoot>
        </div>
    );
};

export default SelectorDialogActions;
