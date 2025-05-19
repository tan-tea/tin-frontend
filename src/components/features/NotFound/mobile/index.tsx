'use client'

import {
    FC,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Text,
    Card,
} from 'ui/index';
import { Blob, } from 'icons/index';

import BackButton from 'common/BackButton';

type NotFoundMobileProps = object;

const NotFoundMobile: FC<NotFoundMobileProps> = (
    props: NotFoundMobileProps
) => {
    const {} = props;

    const t = useTranslations();

    return (
        <Box
            component='section'
            className='h-dvh w-full overflow-hidden'
        >
        </Box>
    );
};

export default NotFoundMobile;
