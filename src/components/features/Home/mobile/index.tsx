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

type HomeMobileProps = object;

const HomeMobile: FC<HomeMobileProps> = (
    props: HomeMobileProps
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

export default HomeMobile;
