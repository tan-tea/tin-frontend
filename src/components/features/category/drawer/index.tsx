'use client'

import type { FC } from 'react';

import { useNavigation } from 'shared/hooks';

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
} from 'ui/drawer';
import { Paragraph } from 'ui/text';

import { useCategoryBySlugData } from 'pages/category-detail/hooks';

import CategoryContent from 'features/category/content';

type Props = Readonly<{
    slug: string;
    locale: string;
}>;

const CategoryDrawer: FC<Props> = ({
    slug,
}) => {
    'use memo'
    const {
        category,
        isLoading,
    } = useCategoryBySlugData(slug);

    if (isLoading) return null;

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
                    <div className='flex flex-col gap-y-2 px-4 pt-4 mb-4'>
                        <DrawerTitle>{category.label}</DrawerTitle>
                        {category.description && (
                            <Paragraph>{category.description}</Paragraph>
                        )}
                    </div>
                    <CategoryContent categoryId={category.id}/>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CategoryDrawer;
