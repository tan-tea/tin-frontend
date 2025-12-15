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

type NotFoundDesktopProps = NotFoundProps;

const NotFoundDesktop: FC<NotFoundDesktopProps> = (
    props: NotFoundDesktopProps
) => {
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
            <Box className='relative size-full p-20'>
                <Box className='size-full flex flex-col gap-y-6 items-center justify-center text-center'>
                    <Typography
                        variant='h1'
                        component='h2'
                        className='text-primary font-secondary text-8xl font-bold max-w-6xl leading-24'
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant='body1'
                        component='p'
                        className='text-xl text-gray-800 max-w-4xl'
                    >
                        {description}
                    </Typography>
                    <Box className='flex items-center gap-x-4'>
                        {/* <Button
                            variant='contained'
                            onClick={() => navigate('/')}
                        >
                            {t('notFound.home')}
                        </Button> */}
                        <Link href='/'>{navigation}</Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFoundDesktop;
