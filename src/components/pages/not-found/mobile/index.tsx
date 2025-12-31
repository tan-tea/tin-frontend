'use client'

import type { FC } from 'react';

import { Link } from 'lib/i18n/navigation';

import { Section } from 'ui/layout';
import { Paragraph } from 'ui/text';

import type { NotFoundProps, } from 'pages/not-found';

type NotFoundMobileProps = NotFoundProps;

const NotFoundMobile: FC<NotFoundMobileProps> = (props) => {
    const {
        title,
        description,
        navigation,
    } = props;

    return (
        <Section className='h-dvh w-full overflow-hidden'>
            <div className='relative size-full p-4'>
                <div className='size-full flex flex-col justify-center gap-y-4 items-center'>
                    <Paragraph className='text-primary font-secondary text-2xl font-bold text-center'>
                        {title}
                    </Paragraph>
                    <Paragraph className='text-sm text-gray-800 text-center'>
                        {description}
                    </Paragraph>
                    <Link href='/'>{navigation}</Link>
                </div>
            </div>
        </Section>
    );
};

export default NotFoundMobile;
