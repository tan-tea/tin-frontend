import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { getCategoryWithOffers } from 'app/actions';

import CategoryDrawer from 'features/category/drawer';

type PageProps = Readonly<{
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}>;

export async function generateMetadata(): Promise<Metadata> {
    return {};
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const slug = (await params).slug;

    let category: Awaited<ReturnType<typeof getCategoryWithOffers>>;
    try {
        category = await getCategoryWithOffers(slug);
    } catch (error) {
        category = null;
    }

    if (!category) return notFound();

    return (
        <CategoryDrawer slug={slug} category={category}/>
    );
}
