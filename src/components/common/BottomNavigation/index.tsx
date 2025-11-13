'use client'

import {
    useMemo,
    useState,
    type FC,
    type ComponentProps,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import {
    useScroll,
    useNavigation,
    usePrefetch,
} from 'shared/hooks';

import Box from 'ui/box';
import {
    Map,
    House,
    Search,
    MessageCircleQuestion,
} from 'icons/index';

import BottomNavigationItem from 'common/BottomNavigation/Item';

const bottomNavigation = tv({
    slots: {
        wrapper: 'z-50 fixed bottom-0 left-0 w-full h-auto bg-transparent transition-transform duration-300 ease-in-out',
        container: 'w-full h-auto px-2 py-4 flex items-center justify-between rounded-t-2xl border border-[var(--mui-palette-grey-100)] bg-white shadow-xs dark:bg-dark-400 dark:border-none',
        hightlight: 'absolute inset-0 bg-[var(--mui-palette-primary-50)] rounded-xl -z-10',
    },
    variants: {
        scrolling: {
            true: {
                wrapper: 'translate-y-full',
            },
            false: {
                wrapper: 'translate-y-0',
            },
        },
    },
});

type BottomNavigationVariants = VariantProps<typeof bottomNavigation>;

type BottomNavigationProps = object & Omit<BottomNavigationVariants, 'scrolling'>;

const BottomNavigation: FC<BottomNavigationProps> = (
    props: BottomNavigationProps,
) => {
    const {} = props;

    const {
        wrapper,
        container,
        hightlight,
    } = bottomNavigation();

    const t = useTranslations('bottomNavigation');

    const {
        moving,
    } = useScroll();

    const {
        pathname,
        navigate,
        isActivePath,
    } = useNavigation();

    const {
        prefetchRoute,
    } = usePrefetch();

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
        <Box className={wrapper({
            scrolling: moving,
        })}>
            <Box
                role='menubar'
                component='nav'
                aria-description='bottom navigation'
                className={container()}
            >
                {items?.map?.(item => (
                    <BottomNavigationItem key={item?.label} {...item}>
                        {item?.selected && currentTab === item?.label && (
                            <motion.div
                                layoutId='highlight'
                                className={hightlight()}
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
