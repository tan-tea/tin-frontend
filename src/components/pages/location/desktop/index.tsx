'use client'

import type { FC } from 'react';

import type {
    LocationProps,
} from 'pages/location';

type BrowseDesktopProps = LocationProps;

const BrowseDesktop: FC<BrowseDesktopProps> = ({
    t
}) => {
    return (
        <div className='h-dvh-screen-mobile w-full overflow-hidden'>
            Map Desktop
        </div>
    );
};

export default BrowseDesktop;
