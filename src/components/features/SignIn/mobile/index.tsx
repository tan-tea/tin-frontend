'use client'

import type {
    FC,
} from 'react';

import { useHideUI } from 'shared/hooks';

import { Box } from 'ui/index';

import type { SignInProps, } from 'feature/SignIn';

import Section from 'common/Section';
import Titlebar from 'common/Titlebar';
import BackButton from 'common/buttons/BackButton';

type SignInMobileProps = SignInProps;

const SignInMobile: FC<SignInMobileProps> = ({
    t,
}) => {
    'use memo'
    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    return (
        <Section
            label={t('signin.title')}
            description={t('signin.description')}
            className='h-full'
        >
            <Titlebar
                position='relative'
                title={t('signin.title')}
                renderStart={() => <BackButton/>}
            />
            <Box className='block size-full'>

            </Box>
        </Section>
    );
};

export default SignInMobile;
