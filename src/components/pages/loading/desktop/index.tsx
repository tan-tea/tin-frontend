'use client'

import type { FC } from 'react';

import { Paragraph } from 'ui/text';

import type { LoadingProps, } from 'pages/loading';

import BackButton from 'common/buttons/back-button';

type LoadingDesktopProps = LoadingProps;

const LoadingDesktop: FC<LoadingDesktopProps> = (props) => {
    const {
        t,
        navigation: {
            navigate,
        },
    } = props;

    return (
        <div className='h-dvh w-full overflow-hidden'>
            <div className='relative size-full p-4'>
                <BackButton className='ml-4 mt-4'/>
                <div className='size-full flex flex-col justify-center gap-y-4 items-center'>
                    <Paragraph className='text-primary font-secondary text-2xl font-bold text-center'>
                        {t('notFound.title')}
                    </Paragraph>
                    <Paragraph className='text-sm text-gray-800 text-center'>
                        {t('notFound.description')}
                    </Paragraph>
                </div>
            </div>
        </div>
    );
};

export default LoadingDesktop;
