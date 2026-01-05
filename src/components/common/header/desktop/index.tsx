'use client'

import type {
    FC
} from 'react';

import { Header } from 'ui/layout';

import { HeaderProps } from 'components/common/header';

const HeaderDesktop: FC<HeaderProps> = (
    props: HeaderProps,
) => {
    const {} = props;

    return (
        <Header
            position='fixed'
            className='z-10 h-header-desktop bg-white shadow-none dark:bg-dark-600'
        >
            <div className='size-full flex items-center px-20'>
                <div
                    aria-label='navigation'
                    className='ml-auto h-full flex items-center gap-x-4'
                >
                </div>
            </div>
        </Header>
    );
};

export default HeaderDesktop;
