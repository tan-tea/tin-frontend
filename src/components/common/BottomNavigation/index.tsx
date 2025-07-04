'use client'

import {
    useMemo,
    type FC,
    type ComponentProps,
} from 'react';

import {
    Box,
} from 'ui/index';
import {
    Map,
    Bell,
    House,
    Heart,
} from 'icons/index';

import BottomNavigationItem from 'common/BottomNavigation/Item';
import { useNavigation } from 'shared/hooks';

type BottomNavigationProps = object;

const BottomNavigation: FC<BottomNavigationProps> = (
    props: BottomNavigationProps,
) => {
    const {} = props;

    const {
        pathname,
        navigate,
        isActivePath,
    } = useNavigation();

    const items: Array<ComponentProps<typeof BottomNavigationItem>> = useMemo(
        () => [
            {
                Icon: House,
                onClick: () => navigate('/'),
                selected: isActivePath('/'),
            },
            {
                Icon: Map,
                onClick: () => navigate('/browse'),
                selected: isActivePath('/browse'),
            },
            {
                Icon: Heart,
                onClick: () => navigate('/favorites'),
                selected: isActivePath('/favorites'),
            },
            {
                Icon: Bell,
                onClick: () => navigate('/notifications'),
                selected: isActivePath('/notifications'),
            },
        ],
        [pathname,],
    );

    return (
        <Box className='z-50 fixed bottom-0 left-0 w-full h-24 p-4 bg-transparent'>
            <Box
                role='menubar'
                component='nav'
                aria-description='bottom navigation'
                className='size-full grid grid-cols-4 items-center rounded-xl border border-gray-200 bg-white'
            >
                {items?.map?.((item, index) => (
                    <BottomNavigationItem key={index} {...item}/>
                ))}
            </Box>
        </Box>
    );
}

export default BottomNavigation;
