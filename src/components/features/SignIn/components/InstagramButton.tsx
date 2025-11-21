'use client'

import {
    memo,
    type FC,
    type MouseEventHandler,
} from 'react';
import { useTranslations, } from 'next-intl';

import { authClient } from 'lib/auth/browser';

import { Button, } from 'ui/index';
import { Instagram, } from 'icons/index';

type InstagramButtonProps = object;

const InstagramButton: FC<InstagramButtonProps> = () => {
    'use memo'
    const t = useTranslations();

    const handleInstagramAuthentication: MouseEventHandler = async () => {
        const response = await authClient.signIn.oauth2({
            providerId: 'instagram',
            callbackURL: '/',
        });
        console.log('response', response);
    };

    return (
        <Button
            block
            size='large'
            rounded='full'
            variant='contained'
            className='bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-sm py-3'
            startIcon={<Instagram className='absolute left-0 top-1/2 -translate-y-1/2 ml-4 size-6 fill-white'/>}
            onClick={handleInstagramAuthentication}
        >
            {t('signin.instagram')}
        </Button>
    );
};

export default memo(InstagramButton);
