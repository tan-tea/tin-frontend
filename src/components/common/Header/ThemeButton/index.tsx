'use client'

import { FC, } from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Button,
    Tooltip,
} from 'ui/index';
import { SunMoon, } from 'icons/index';

import { useDialog, } from 'shared/contexts/dialog';

type ThemeButtonProps = object;

const ThemeButton: FC<ThemeButtonProps> = (
    props: ThemeButtonProps
) => {
    const {} = props;

    const t = useTranslations();

    const { openDialog, } = useDialog();

    return (
        <Tooltip title={t('theme.tooltip')}>
            <Box>
                <Button
                    size='large'
                    color='primary'
                    variant='text'
                    rounded='lg'
                    className='size-12'
                    onClick={() => openDialog('theme-dialog')}
                >
                    <SunMoon
                        className='size-6 text-gray-600 dark:text-gray-300'
                        strokeWidth={2}
                        absoluteStrokeWidth
                    />
                </Button>
            </Box>
        </Tooltip>
    );
};

export default ThemeButton;
