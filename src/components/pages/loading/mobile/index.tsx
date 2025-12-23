'use client'

import type { FC } from 'react';

import { Section } from 'ui/layout';
import { Paragraph } from 'ui/text';

import type { LoadingProps, } from 'pages/loading';

type LoadingMobileProps = LoadingProps;

const LoadingMobile: FC<LoadingMobileProps> = ({ t }) => {
    'use memo'

    return (
        <Section
            aria-label={t('message')}
            className='h-dvh w-full overflow-hidden'
        >
            <div className='relative size-full flex items-center justify-center'>
                <div className='relative w-20 h-[50px]'>
                    <Paragraph className='absolute top-0 font-medium text-base'>
                        {t('message')}
                    </Paragraph>
                    <span className='absolute bottom-0 block h-4 w-8 rounded-full bg-primary  animate-[var(--animate-loading_713)]'>
                        <span className='absolute inset-0 block rounded-full bg-primary-light animate-[var(--animate-loading2_713)]'/>
                    </span>
                </div>
            </div>
        </Section>
    );
};

export default LoadingMobile;
