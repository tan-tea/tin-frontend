'use client'

import {
    useMemo,
    useState,
    type FC,
    type ComponentProps,
} from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import {
    Box,
} from 'ui/index';
import {
    Map,
    Search,
    House,
    MessageCircleQuestion,
} from 'icons/index';
import { useNavigation, } from 'shared/hooks';

import BottomNavigationItem from 'common/BottomNavigation/Item';

type BottomNavigationProps = object;

const BottomNavigation: FC<BottomNavigationProps> = (
    props: BottomNavigationProps,
) => {
    const {} = props;

    const t = useTranslations('bottomNavigation');

    const {
        pathname,
        navigate,
        isActivePath,
    } = useNavigation();

    const items: Array<ComponentProps<typeof BottomNavigationItem>> = useMemo(
        () => [
            {
                Icon: House,
                label: t('home'),
                onClick: () => {
                    navigate('/');
                    setCurrentTab(t('home'));
                },
                selected: isActivePath('/'),
            },
            {
                Icon: Search,
                label: t('search'),
                onClick: () => {
                    navigate('/search');
                    setCurrentTab(t('search'));
                },
                selected: isActivePath('/search'),
            },
            {
                Icon: Map,
                label: t('browse'),
                onClick: () => {
                    navigate('/browse');
                    setCurrentTab(t('browse'));
                },
                selected: isActivePath('/browse'),
            },
            {
                Icon: MessageCircleQuestion,
                label: t('help'),
                onClick: () => {
                    navigate('/help');
                    setCurrentTab(t('help'));
                },
                selected: isActivePath('/help'),
            },
        ],
        [pathname,],
    );

    const [currentTab, setCurrentTab,] = useState<string | null>(
        items.find?.(s => s?.selected)?.label || t('home')
    );

    return (
        <Box className='z-50 fixed bottom-0 left-0 w-full h-auto p-4 bg-transparent'>
            <Box
                role='menubar'
                component='nav'
                aria-description='bottom navigation'
                className='w-full h-auto p-4 flex items-center justify-between rounded-2xl border-2 border-primary-light bg-dark dark:bg-dark-400 dark:border-none'
            >
                {items?.map?.(item => (
                    <BottomNavigationItem key={item?.label} {...item}>
                        {item?.selected && currentTab === item?.label && (
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
