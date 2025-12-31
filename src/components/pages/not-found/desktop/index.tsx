'use client'

import type { FC } from 'react';

import { Link } from 'lib/i18n/navigation';

import { Section } from 'ui/layout';
import { Paragraph } from 'ui/text';

import type { NotFoundProps, } from 'pages/not-found';

type NotFoundDesktopProps = NotFoundProps;

const NotFoundDesktop: FC<NotFoundDesktopProps> = ({
    title,
    description,
    navigation,
}) => {
    'use memo'

    return (
        <Section className='h-dvh w-full overflow-hidden'>
            <div className='relative size-full p-20'>
                <div className='size-full flex flex-col gap-y-6 items-center justify-center text-center'>
                    <Paragraph className='text-primary font-secondary text-8xl font-bold max-w-6xl leading-24'>
                        {title}
                    </Paragraph>
                    <Paragraph className='text-xl text-gray-800 max-w-4xl'>
                        {description}
                    </Paragraph>
                    <div className='flex items-center gap-x-4'>
                        <Link href='/'>{navigation}</Link>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default NotFoundDesktop;
