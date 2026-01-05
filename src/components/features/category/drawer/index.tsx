'use client'

import type { FC } from 'react';

import { useNavigation } from 'shared/hooks';

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
} from 'ui/drawer';

import { useCategoryOffersData } from 'pages/category-detail/hooks';

import CategoryContent from 'features/category/content';

type Props = Readonly<{ slug: string; }>;

const CategoryDrawer: FC<Props> = ({
    slug,
}) => {
    'use memo'
    const {
        router,
        isActivePath,
    } = useNavigation();

    // Determine if dialog is open when category/slug is on route, is navigate from dialog, this is false.
    const categoryIsActive = isActivePath(`/category/${slug}`);

    const {
        category,
        isLoading,
    } = useCategoryOffersData(slug);

    const loading = isLoading;

    if (loading) return null;

    return (
        <Drawer
            open={categoryIsActive}
            onOpenChange={() => categoryIsActive && router.back()}
        >
            <DrawerContent className='h-[95%] data-[vaul-drawer-direction=bottom]:max-h-[100dvh]'>
                <div className='size-full overflow-y-auto scrollbar-hide md:scrollbar-default'>
                    <DrawerTitle className='px-4 pt-4'>{category.label}</DrawerTitle>
                    <CategoryContent/>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CategoryDrawer;
