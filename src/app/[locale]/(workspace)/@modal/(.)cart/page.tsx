import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { getCategoryWithOffers } from 'app/actions';

import CartDrawer from 'features/cart/drawer';

type PageProps = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export async function generateMetadata(): Promise<Metadata> {
    return {};
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const locale = (await params).locale;

    // if (!category) return notFound();

    return (
        <CartDrawer locale={locale}/>
    );
}
