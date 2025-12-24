'use client'

import type { FC } from 'react';

import type {
    Category
} from 'shared/models';
import { currentCategoryAtom } from 'shared/state';
import { useNavigation, useHydrateAndSyncAtom } from 'shared/hooks';

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
} from 'ui/drawer';

import CategoryContent from 'features/category/content';

type CategoryDrawerProps = Readonly<{
    slug: string;
    category: Category;
}>;

const CategoryDrawer: FC<CategoryDrawerProps> = ({
    slug,
    category,
}) => {
    'use memo'
    useHydrateAndSyncAtom([
        [currentCategoryAtom, category],
    ]);

    const { label } = category;

    const {
        router,
        isActivePath,
    } = useNavigation();

    // Determine if dialog is open when category/slug is on route, is navigate from dialog, this is false.
    const categoryIsActive = isActivePath(`/category/${slug}`);

    return (
        <Drawer
            open={categoryIsActive}
            onOpenChange={() => categoryIsActive && router.back()}
        >
            <DrawerContent className='h-[95%] data-[vaul-drawer-direction=bottom]:max-h-[100dvh]'>
                <div className='size-full overflow-y-auto scrollbar-hide md:scrollbar-default'>
                    <DrawerTitle className='px-4 pt-4'>{label}</DrawerTitle>
                    <CategoryContent/>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CategoryDrawer;
