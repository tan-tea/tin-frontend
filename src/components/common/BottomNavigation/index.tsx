'use client'

import {
    useMemo,
    useState,
    type FC,
    type ComponentProps,
} from 'react';
import { motion } from 'motion/react';

import {
    Box,
} from 'ui/index';
import {
    Map,
    Bell,
    House,
    Heart,
} from 'icons/index';
import { useNavigation, } from 'shared/hooks';

import BottomNavigationItem from 'common/BottomNavigation/Item';

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
                label: 'Home',
                onClick: () => {
                    navigate('/');
                    setCurrentTab('Home');
                },
                selected: isActivePath('/'),
            },
            {
                Icon: Map,
                label: 'Map',
                onClick: () => {
                    navigate('/browse');
                    setCurrentTab('Map');
                },
                selected: isActivePath('/browse'),
            },
            {
                Icon: Heart,
                label: 'Favorites',
                onClick: () => {
                    navigate('/new');
                    setCurrentTab('Favorites');
                },
                selected: isActivePath('/new'),
            },
            {
                Icon: Bell,
                label: 'Notifications',
                onClick: () => {
                    navigate('/notifications');
                    setCurrentTab('Notifications');
                },
                selected: isActivePath('/notifications'),
            },
        ],
        [pathname,],
    );

    const [currentTab, setCurrentTab,] = useState<string | null>(
        items.find?.(s => s?.selected)?.label || 'Home'
    );

    return (
        <Box className='z-50 fixed bottom-0 left-0 w-full h-auto p-4 bg-transparent'>
            <Box
                role='menubar'
                component='nav'
                aria-description='bottom navigation'
                className='w-full h-auto p-4 flex items-center justify-between rounded-2xl border-2 border-primary-light bg-dark'
            >
                {items?.map?.(item => (
                    <BottomNavigationItem key={item?.label} {...item}>
                        {currentTab === item?.label && (
                            <motion.div
                                layoutId='highlight'
                                className='absolute inset-0 bg-primary-light rounded-xl -z-10'
                                transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        )}
                    </BottomNavigationItem>
                ))}
            </Box>
        </Box>
    );
}

export default BottomNavigation;
