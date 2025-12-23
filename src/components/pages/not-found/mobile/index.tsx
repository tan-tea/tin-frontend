'use client'

import type {
    FC,
} from 'react';

import { Link } from 'lib/i18n/navigation';

import {
    Box,
    Typography,
} from 'ui/index';

import { NotFoundProps, } from 'components/pages/not-found';

type NotFoundMobileProps = NotFoundProps;

const NotFoundMobile: FC<NotFoundMobileProps> = (props) => {
    const {
        title,
        description,
        navigation,
    } = props;

    return (
        <Box
            component='section'
            className='h-dvh w-full overflow-hidden'
        >
            <Box className='relative size-full p-4'>
                <Box className='size-full flex flex-col justify-center gap-y-4 items-center'>
                    <Typography
                        variant='h1'
                        component='h2'
                        className='text-primary font-secondary text-2xl font-bold text-center'
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant='body1'
                        component='p'
                        className='text-sm text-gray-800 text-center'
                    >
                        {description}
                    </Typography>
                    <Link href='/'>{navigation}</Link>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFoundMobile;
