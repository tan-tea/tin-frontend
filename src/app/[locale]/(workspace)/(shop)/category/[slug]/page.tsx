import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getCategoryBySlug } from 'app/actions';
import { cachedQueryClient } from 'app/get-query-client';

import CategoryDetail from 'pages/category-detail';

type PageProps = Readonly<{
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}>;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { params } = props;

    const slug = (await params).slug;
    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    const category = await getCategoryBySlug(slug);

    if (!category) return { title: t('notFound.title') };

    if ('error' in category) return { title: category?.error };

    const title = category.label,
        description = category.description ?? t('category.description');

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    };
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const slug = (await params).slug;
    const locale = (await params).locale;

    const queryClient = cachedQueryClient();

    const category = await queryClient.fetchQuery({
        queryKey: ['category-by-slug', slug],
        queryFn: () => getCategoryBySlug(slug),
    });

    if (!category || 'error' in category) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoryDetail slug={slug} locale={locale}/>
        </HydrationBoundary>
    );
}
